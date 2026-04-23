import { useState, useEffect } from "react"
import { Controller } from "react-hook-form"
import { MapPin, Loader2, Check, Map as MapIcon, X, Info } from "lucide-react"
import { Dialog } from "primereact/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/HeroThemeContext"
import { FormInput, FormButton } from "@/components/form"
import dynamic from "next/dynamic"

// Importa o MapaCaptura dinamicamente para evitar erro de SSR
const MapaCaptura = dynamic(() => import("@/components/MapaCaptura"), {
  ssr: false,
  loading: () => (
    <div
      className="h-64 w-full rounded-2xl flex items-center justify-center animate-pulse"
      style={{
        background:
          "linear-gradient(135deg, rgba(219,111,87,0.08) 0%, rgba(79,111,100,0.06) 100%)",
      }}
    >
      <div className="flex items-center gap-2 text-[#5a4a42]/65">
        <Loader2 className="w-5 h-5 animate-spin text-[#db6f57]" />
        <span className="text-sm font-medium">Carregando mapa...</span>
      </div>
    </div>
  ),
})

interface AddressFormProps {
  control: any
  errors: any
  setValue: any
  watch: any
}

export const AddressForm = ({ control, errors, setValue, watch }: AddressFormProps) => {
  const { isDark } = useTheme()
  const [isSearching, setIsSearching] = useState(false)
  const [cepFound, setCepFound] = useState(false)
  const [cepError, setCepError] = useState("")
  const [showMapModal, setShowMapModal] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)

  const cepValue = watch("cep")
  const latitude = watch("latitude")
  const longitude = watch("longitude")
  const numero = watch("numero")

  // Busca automática quando CEP estiver completo
  useEffect(() => {
    const cepLimpo = cepValue?.replace(/\D/g, "") || ""
    if (cepLimpo.length === 8 && !cepFound) {
      buscarCEP()
    } else if (cepLimpo.length < 8) {
      setCepFound(false)
      setCepError("")

      setValue("rua", "")
      setValue("bairro", "")
      setValue("cidade", "")
      setValue("estado", "")
      setValue("complemento", "")
      setValue("numero", "")
    }
  }, [cepValue])

  useEffect(() => {
    const fetchCoordenadas = async () => {
      if (numero !== null && numero !== undefined && numero !== "") {
        const logradouro = watch("rua")
        const bairro = watch("bairro")
        const cidade = watch("cidade")
        const estado = watch("estado")

        await buscarCoordenadas(logradouro, cidade, estado, numero)
      }
    }
    fetchCoordenadas()
  }, [numero])

  // Função para buscar CEP
  const buscarCEP = async () => {
    const cepLimpo = cepValue?.replace(/\D/g, "") || ""

    if (cepLimpo.length !== 8) {
      setCepError("CEP inválido")
      return
    }

    setIsSearching(true)
    setCepError("")

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await response.json()

      if (data.erro) {
        setCepError("CEP não encontrado")
        setCepFound(false)
        setIsSearching(false)
        return
      }

      // Preenche os campos com os dados do CEP
      setValue("rua", data.logradouro)
      setValue("bairro", data.bairro)
      setValue("cidade", data.localidade)
      setValue("estado", data.uf)
      setValue("complemento", data.complemento || "")

      // Busca latitude e longitude usando Nominatim (OpenStreetMap)
      await buscarCoordenadas(data.logradouro, data.localidade, data.uf)

      setCepFound(true)
      setIsSearching(false)
    } catch (error) {
      setCepError("Erro ao buscar CEP")
      setCepFound(false)
      setIsSearching(false)
    }
  }

  // Função para buscar coordenadas
  const buscarCoordenadas = async (rua: string, cidade: string, estado: string, numero?: number) => {
    try {
      const endereco = `${rua}, ${numero}, ${cidade}, ${estado}, Brasil`
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&limit=1`
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        setValue("latitude", lat)
        setValue("longitude", lng)
        setCurrentLocation({ lat, lng })
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error)
    }
  }

  const hasCoords = latitude !== undefined && latitude !== null && longitude !== undefined && longitude !== null
  const showMapBlock = cepFound && !!numero && hasCoords

  // Tokens auxiliares apenas para o cabeçalho/blocos auxiliares
  const headingClass = isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"
  const subtitleClass = isDark ? "text-[#B8AEA4]" : "text-[#6b5d57]"
  const eyebrowDash = "h-px w-8 bg-[#db6f57] opacity-50"
  const eyebrowText = "text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]"

  return (
    <div className="space-y-8">
      {/* ─── Section header (sem border-b, alinhado ao Step 0) ─── */}
      <div className="flex items-center gap-3 mb-2 transition-colors duration-300">
        <div className="w-12 h-12 rounded-xl bg-[#4f6f64]/10 flex items-center justify-center">
          <MapPin className={`w-6 h-6 ${isDark ? "text-[#6B8F82]" : "text-[#4f6f64]"}`} />
        </div>
        <div>
          <h3 className={`font-serif text-xl md:text-2xl font-bold ${headingClass} transition-colors duration-300 leading-tight`}>
            Localização
          </h3>
          <p className={`text-sm ${subtitleClass} transition-colors duration-300 mt-0.5`}>
            Onde fica seu negócio.
          </p>
        </div>
      </div>

      {/* ─── Bloco 1: CEP do endereço ─── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <span aria-hidden className={eyebrowDash} />
          <span className={eyebrowText}>CEP do endereço</span>
        </div>

        <Controller
          name="cep"
          control={control}
          rules={{ required: "CEP é obrigatório" }}
          render={({ field }) => (
            <FormInput
              label="CEP"
              mask="99999-999"
              placeholder="00000-000"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              required
              isDark={isDark}
              autoFocus
              loading={isSearching}
              loadingMessage="Buscando informações do CEP..."
              success={cepFound}
              successMessage={cepFound ? "Endereço encontrado · campos preenchidos automaticamente" : undefined}
              error={cepError ? cepError : (errors.cep && !cepFound ? errors.cep.message : undefined)}
              helperText={!cepFound && !isSearching && !cepError ? "Digite o CEP e a gente preenche o resto pra você." : undefined}
            />
          )}
        />
      </div>

      {/* ─── Bloco 2: Endereço (revela quando o CEP é encontrado) ─── */}
      <AnimatePresence initial={false}>
        {cepFound && (
          <motion.div
            key="endereco-block"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span aria-hidden className={eyebrowDash} />
                <span className={eyebrowText}>Endereço</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Controller
                    name="rua"
                    control={control}
                    rules={{ required: "Rua é obrigatória" }}
                    render={({ field }) => (
                      <FormInput
                        label="Rua"
                        placeholder="Nome da rua"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        required
                        isDark={isDark}
                        error={errors.rua?.message}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="numero"
                  control={control}
                  rules={{ required: "Número é obrigatório" }}
                  render={({ field }) => (
                    <FormInput
                      label="Número"
                      placeholder="000"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required
                      isDark={isDark}
                      error={errors.numero?.message}
                    />
                  )}
                />

                <Controller
                  name="complemento"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      label="Complemento"
                      placeholder="Sala, andar, referência…"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      isDark={isDark}
                      helperText="Opcional"
                    />
                  )}
                />

                <Controller
                  name="bairro"
                  control={control}
                  rules={{ required: "Bairro é obrigatório" }}
                  render={({ field }) => (
                    <FormInput
                      label="Bairro"
                      placeholder="Nome do bairro"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required
                      isDark={isDark}
                      error={errors.bairro?.message}
                    />
                  )}
                />

                <Controller
                  name="cidade"
                  control={control}
                  rules={{ required: "Cidade é obrigatória" }}
                  render={({ field }) => (
                    <FormInput
                      label="Cidade"
                      placeholder="Nome da cidade"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required
                      isDark={isDark}
                      error={errors.cidade?.message}
                    />
                  )}
                />

                <Controller
                  name="estado"
                  control={control}
                  rules={{ required: "Estado é obrigatório" }}
                  render={({ field }) => (
                    <FormInput
                      label="UF"
                      placeholder="SP"
                      name={field.name}
                      value={field.value}
                      onChange={(e: any) => field.onChange((e?.target?.value ?? "").toUpperCase())}
                      onBlur={field.onBlur}
                      required
                      isDark={isDark}
                      maxLength={2}
                      inputClassName="uppercase"
                      error={errors.estado?.message}
                    />
                  )}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bloco 3: Confirme no mapa (revela quando há número + coordenadas) ─── */}
      <AnimatePresence initial={false}>
        {showMapBlock && (
          <motion.div
            key="mapa-block"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span aria-hidden className={eyebrowDash} />
                <span className={eyebrowText}>Confirme no mapa</span>
              </div>

              <p className={`text-sm ${subtitleClass} -mt-1`}>
                Confira se o pino está no lugar certo. Se não, clique em Ajustar.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Controller
                  name="latitude"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      label="Latitude"
                      name={field.name}
                      value={field.value !== undefined && field.value !== null && field.value !== "" ? Number(field.value).toFixed(6) : ""}
                      onChange={() => { /* read-only display */ }}
                      disabled
                      isDark={isDark}
                      showStatusIcon={false}
                    />
                  )}
                />

                <Controller
                  name="longitude"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      label="Longitude"
                      name={field.name}
                      value={field.value !== undefined && field.value !== null && field.value !== "" ? Number(field.value).toFixed(6) : ""}
                      onChange={() => { /* read-only display */ }}
                      disabled
                      isDark={isDark}
                      showStatusIcon={false}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div
                  className={`flex items-start gap-2 text-[12px] leading-snug ${
                    isDark ? "text-[#7AB8A4]" : "text-[#5a7a6e]"
                  }`}
                >
                  <Check className="w-4 h-4 mt-px flex-shrink-0" />
                  <span>Localização registrada · você pode ajustar se precisar.</span>
                </div>

                <FormButton
                  type="button"
                  label="Ajustar localização"
                  variant="primary"
                  size="sm"
                  icon={MapPin}
                  iconPosition="left"
                  isDark={isDark}
                  onClick={() => setShowMapModal(true)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal do Mapa */}
      <InteractiveMapModal
        visible={showMapModal}
        onHide={() => setShowMapModal(false)}
        currentLocation={currentLocation}
        endereco={
          watch("rua") + ", " + watch("numero") + " - " + watch("bairro") + ", " + watch("cidade") + " - " + watch("estado")
        }
        onLocationSelect={(lat, lng) => {
          setValue("latitude", lat)
          setValue("longitude", lng)
          setCurrentLocation({ lat, lng })
          setShowMapModal(false)
        }}
        isDark={isDark}
      />
    </div>
  )
}

// Componente de Modal do Mapa Interativo
interface MapModalProps {
  visible: boolean
  onHide: () => void
  currentLocation: { lat: number; lng: number } | null
  endereco: string
  onLocationSelect: (lat: number, lng: number) => void
  isDark: boolean
}

const InteractiveMapModal = ({ visible, onHide, currentLocation, endereco, onLocationSelect, isDark }: MapModalProps) => {
  const [selectedLocation, setSelectedLocation] = useState(currentLocation)

  useEffect(() => {
    setSelectedLocation(currentLocation)
  }, [currentLocation])

  // ─── Tokens alinhados com o Card do cadastro ───
  const cardBg = isDark ? "rgba(26,23,21,0.95)" : "rgba(255,255,255,0.95)"
  const cardBorderColor = isDark ? "#3d2e28" : "#db6f5728"
  const cardShadow = isDark
    ? "0 30px 60px -20px rgba(0,0,0,0.55), 0 12px 24px -12px rgba(0,0,0,0.35)"
    : "0 30px 60px -20px rgba(42,36,32,0.18), 0 12px 24px -12px rgba(42,36,32,0.10)"
  const headingText = isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"
  const subtitleText = isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/65"
  const closeColor = isDark ? "text-[#B8AEA4] hover:text-[#E07A62]" : "text-[#5a4a42]/55 hover:text-[#db6f57]"
  const tipText = isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"

  const handleCoordinateChange = (type: "lat" | "lng", value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setSelectedLocation((prev) => ({
        lat: type === "lat" ? numValue : prev?.lat || 0,
        lng: type === "lng" ? numValue : prev?.lng || 0,
      }))
    }
  }

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng })
  }

  return (
    <Dialog
      modal
      visible={visible}
      onHide={onHide}
      style={{ width: "90vw", maxWidth: "920px" }}
      pt={{
        mask: {
          className: "!bg-[#2a2420]/55 !backdrop-blur-sm",
        },
        root: {
          className: "!shadow-none !border-0 !bg-transparent",
        },
      }}
      content={() => (
        <div
          className="relative rounded-3xl overflow-hidden border"
          style={{
            backgroundColor: cardBg,
            borderColor: cardBorderColor,
            boxShadow: cardShadow,
            backdropFilter: "blur(16px)",
          }}
        >
          {/* ─── Watermark serif decorativo ─── */}
          <span
            aria-hidden
            className="absolute top-3 right-6 font-serif font-black leading-none select-none pointer-events-none z-0"
            style={{
              fontSize: "clamp(80px, 11vw, 140px)",
              color: isDark ? "rgba(224,122,98,0.05)" : "rgba(219,111,87,0.06)",
              letterSpacing: "-0.06em",
            }}
          >
            GPS
          </span>

          {/* ─── Blob ambiente sutil ─── */}
          <motion.div
            aria-hidden
            className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse, rgba(79,111,100,0.10), transparent 65%)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ─── Header ─── */}
          <div className="relative z-10 flex items-start justify-between gap-3 px-6 md:px-8 pt-6 md:pt-7">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                  Ajuste fino · GPS
                </span>
              </div>
              <h3 className={`font-serif text-xl md:text-2xl font-bold ${headingText} leading-[1.08]`}>
                Confirme a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #db6f57 0%, #8b3d35 100%)",
                  }}
                >
                  localização exata
                </span>
              </h3>
              <p className={`text-[13px] ${subtitleText} mt-2 leading-relaxed max-w-md`}>
                Clique no mapa, arraste pra explorar ou use a busca — o pino marca onde sua loja vai aparecer pros clientes.
              </p>
            </div>

            <button
              type="button"
              onClick={onHide}
              className={`flex-shrink-0 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center transition-all ${closeColor} hover:bg-[#db6f57]/8`}
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ─── Content ─── */}
          <div className="relative z-10 space-y-6 px-6 md:px-8 py-6 overflow-y-auto max-h-[68vh]">
            {/* Tip box no padrão warm card translúcido */}
            <div
              className="rounded-2xl border p-4 backdrop-blur"
              style={{
                backgroundColor: isDark ? "rgba(224,122,98,0.06)" : "rgba(219,111,87,0.05)",
                borderColor: isDark ? "rgba(224,122,98,0.18)" : "rgba(219,111,87,0.18)",
              }}
            >
              <p className={`text-sm font-semibold ${tipText} flex items-center gap-2 mb-2.5`}>
                <Info className={`w-4 h-4 flex-shrink-0 ${isDark ? "text-[#E07A62]" : "text-[#db6f57]"}`} />
                Como ajustar a localização
              </p>
              <ul className={`text-[13px] ${subtitleText} space-y-1.5 ml-6 list-disc marker:text-[#db6f57]`}>
                <li>Clique no mapa pra mover o marcador.</li>
                <li>Use a busca pra encontrar um endereço específico.</li>
                <li>Arraste o mapa pra explorar a região.</li>
              </ul>
            </div>

            {/* Mapa interativo com wrapper para suavizar bordas legacy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                  Mapa interativo
                </span>
              </div>
              <div
                className="rounded-2xl overflow-hidden border"
                style={{
                  borderColor: isDark ? "#2D2925" : "#e6d9d4",
                  boxShadow: isDark
                    ? "0 8px 24px -8px rgba(0,0,0,0.4)"
                    : "0 8px 24px -8px rgba(42,36,32,0.12)",
                }}
              >
                <MapaCaptura
                  latInicial={selectedLocation?.lat}
                  lngInicial={selectedLocation?.lng}
                  aoSelecionar={handleMapClick}
                  isDark={isDark}
                  endereco={endereco}
                />
              </div>
            </div>

            {/* Coordenadas selecionadas */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                  Coordenadas selecionadas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Latitude"
                  placeholder="-23.550520"
                  value={selectedLocation?.lat !== undefined ? selectedLocation.lat.toFixed(6) : ""}
                  onChange={(e: any) => handleCoordinateChange("lat", e.target.value)}
                  isDark={isDark}
                  helperText="Exemplo: -23.550520"
                  showStatusIcon={false}
                />
                <FormInput
                  label="Longitude"
                  placeholder="-46.633308"
                  value={selectedLocation?.lng !== undefined ? selectedLocation.lng.toFixed(6) : ""}
                  onChange={(e: any) => handleCoordinateChange("lng", e.target.value)}
                  isDark={isDark}
                  helperText="Exemplo: -46.633308"
                  showStatusIcon={false}
                />
              </div>
            </div>

            {/* Atalhos pro Google Maps */}
            <div className="flex flex-col sm:flex-row gap-3">
              <FormButton
                type="button"
                label="Abrir no Google Maps"
                variant="secondary"
                size="sm"
                icon={MapIcon}
                iconPosition="left"
                isDark={isDark}
                fullWidth
                onClick={() => {
                  const searchQuery = encodeURIComponent(endereco)
                  window.open(`https://www.google.com/maps/search/${searchQuery}`, "_blank")
                }}
              />
              {selectedLocation && (
                <FormButton
                  type="button"
                  label="Ver coordenadas no Maps"
                  variant="secondary"
                  size="sm"
                  icon={MapIcon}
                  iconPosition="left"
                  isDark={isDark}
                  fullWidth
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/@${selectedLocation.lat},${selectedLocation.lng},18z`,
                      "_blank"
                    )
                  }}
                />
              )}
            </div>
          </div>

          {/* ─── Footer ─── */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:justify-end px-6 md:px-8 pb-6 md:pb-7 pt-2">
            <FormButton
              type="button"
              label="Cancelar"
              variant="secondary"
              size="md"
              isDark={isDark}
              onClick={onHide}
            />
            <FormButton
              type="button"
              label="Confirmar localização"
              variant="primary"
              size="md"
              icon={Check}
              iconPosition="left"
              isDark={isDark}
              disabled={!selectedLocation}
              onClick={() => {
                if (selectedLocation) {
                  onLocationSelect(selectedLocation.lat, selectedLocation.lng)
                }
              }}
            />
          </div>
        </div>
      )}
    />
  )
}
