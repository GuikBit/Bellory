import { useState, useEffect } from "react"
import { Controller } from "react-hook-form"
import { MapPin, Search, Loader2, Check, Map as MapIcon, X } from "lucide-react"
import { InputMask } from "primereact/inputmask"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/HeroThemeContext"
import { cadastroThemeConfig } from "@/app/cadastro/page"
import dynamic from "next/dynamic"

// Importa o MapaCaptura dinamicamente para evitar erro de SSR
const MapaCaptura = dynamic(() => import("@/components/MapaCaptura"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl flex items-center justify-center">
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Carregando Mapa...</span>
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

  const theme = isDark ? cadastroThemeConfig.dark : cadastroThemeConfig.light

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

  // Cores dinâmicas baseadas no tema
  const colors = {
    // Backgrounds
    sectionHeaderBg: isDark ? "bg-[#E07A62]/10" : "bg-[#4f6f64]/10",
    sectionIconBg: isDark ? "bg-[#E07A62]/20" : "bg-[#4f6f64]/10",
    tipBg: isDark ? "bg-[#E07A62]/10 border-[#E07A62]/20" : "bg-[#db6f57]/10 border-[#db6f57]/20",
    successBg: isDark ? "bg-[#6B8F82]/10 border-[#6B8F82]/20" : "bg-[#4f6f64]/10 border-[#4f6f64]/20",

    // Borders
    sectionBorder: isDark ? "border-[#2D2925]" : "border-[#d8ccc4]",
    inputBorder: isDark ? "border-[#2D2925]" : "border-[#d8ccc4]",
    inputFocusBorder: isDark ? "focus:border-[#E07A62]" : "focus:border-[#4f6f64]",
    inputErrorBorder: isDark ? "border-[#E07A62]" : "border-[#d15847]",
    inputSuccessBorder: isDark ? "border-[#6B8F82]" : "border-[#4f6f64]",

    // Text
    headingText: isDark ? "text-[#F5F0EB]" : "text-[#2a2420]",
    subtitleText: isDark ? "text-[#B8AEA4]" : "text-[#4f6f64]",
    labelText: isDark ? "text-[#F5F0EB]" : "text-[#2a2420]",
    errorText: isDark ? "text-[#E07A62]" : "text-[#d15847]",
    tipText: isDark ? "text-[#E07A62]" : "text-[#6b2f2a]",
    successText: isDark ? "text-[#6B8F82]" : "text-[#4f6f64]",
    requiredMark: isDark ? "text-[#E07A62]" : "text-[#d15847]",

    // Icons
    iconColor: isDark ? "text-[#E07A62]" : "text-[#4f6f64]",
    searchIconColor: isDark ? "text-[#7A716A]" : "text-[#9ca3af]",

    // Input backgrounds
    inputBg: isDark ? "bg-[#1A1715]" : "bg-white",
    disabledBg: isDark ? "bg-[#1A1715]/60" : "bg-gray-50",

    // Buttons
    primaryBtn: "bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white",
  }

  // Classes de input dinâmicas
  const getInputClasses = (hasError: boolean, isSuccess: boolean = false, disabled: boolean = false) => {
    const baseClasses = `w-full px-4 py-3 border-2 rounded-xl transition-all ${colors.inputBg} ${colors.headingText}`

    if (disabled) {
      return `${baseClasses} ${colors.disabledBg} cursor-not-allowed opacity-60 ${colors.inputBorder}`
    }

    if (hasError) {
      return `${baseClasses} ${colors.inputErrorBorder}`
    }

    if (isSuccess) {
      return `${baseClasses} ${colors.inputSuccessBorder}`
    }

    return `${baseClasses} ${colors.inputBorder} ${colors.inputFocusBorder}`
  }

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${colors.sectionBorder}`}>
        <div className={`w-12 h-12 rounded-xl ${colors.sectionIconBg} flex items-center justify-center`}>
          <MapPin className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${colors.headingText}`}>Localização</h3>
          <p className={`text-sm ${colors.subtitleText}`}>Endereço do estabelecimento</p>
        </div>
      </div>

      {/* CEP com busca automática */}
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>
            CEP <span className={colors.requiredMark}>*</span>
          </label>
          <div className="relative">
            <Controller
              name="cep"
              control={control}
              rules={{ required: "CEP é obrigatório" }}
              render={({ field }) => (
                <InputMask
                  {...field}
                  mask="99999-999"
                  placeholder="00000-000"
                  className={getInputClasses(errors.cep || cepError, cepFound)}
                  style={{ paddingRight: '3rem' }}
                />
              )}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {isSearching ? (
                <Loader2 className={`w-5 h-5 ${colors.iconColor} animate-spin`} />
              ) : cepFound ? (
                <Check className={`w-5 h-5 ${colors.successText}`} />
              ) : (
                <Search className={`w-5 h-5 ${colors.searchIconColor}`} />
              )}
            </div>
          </div>
          {(errors.cep || cepError) && (
            <small className={`${colors.errorText} text-sm mt-1 block`}>
              {errors.cep?.message || cepError}
            </small>
          )}
          {isSearching && (
            <small className={`${colors.subtitleText} text-sm mt-1 block flex items-center gap-1`}>
              <Loader2 className="w-3 h-3 animate-spin" />
              Buscando informações do CEP...
            </small>
          )}
        </div>

        {/* Info sobre CEP */}
        <AnimatePresence>
          {!cepFound && !isSearching && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`${colors.tipBg} border rounded-xl p-4`}
            >
              <p className={`text-sm ${colors.tipText} flex items-center gap-2`}>
                <Search className="w-4 h-4" />
                <span>
                  <strong>Dica:</strong> Digite o CEP e os campos serão preenchidos automaticamente
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Campos de endereço (bloqueados até buscar CEP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>
            Rua <span className={colors.requiredMark}>*</span>
          </label>
          <Controller
            name="rua"
            control={control}
            rules={{ required: "Rua é obrigatória" }}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder={cepFound ? "Nome da rua" : "Digite o CEP primeiro"}
                disabled={!cepFound}
                className={getInputClasses(errors.rua, false, !cepFound)}
              />
            )}
          />
          {errors.rua && <small className={`${colors.errorText} text-sm mt-1 block`}>{errors.rua.message}</small>}
        </div>

        <div>
          <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>
            Número <span className={colors.requiredMark}>*</span>
          </label>
          <Controller
            name="numero"
            control={control}
            rules={{ required: "Número é obrigatório" }}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder={cepFound ? "000" : "Digite o CEP primeiro"}
                disabled={!cepFound}
                className={getInputClasses(errors.numero, false, !cepFound)}
              />
            )}
          />
          {errors.numero && <small className={`${colors.errorText} text-sm mt-1 block`}>{errors.numero.message}</small>}
        </div>

        <div>
          <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>Complemento</label>
          <Controller
            name="complemento"
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder={cepFound ? "Opcional" : "Digite o CEP primeiro"}
                disabled={!cepFound}
                className={getInputClasses(false, false, !cepFound)}
              />
            )}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>
            Bairro <span className={colors.requiredMark}>*</span>
          </label>
          <Controller
            name="bairro"
            control={control}
            rules={{ required: "Bairro é obrigatório" }}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder={cepFound ? "Nome do bairro" : "Digite o CEP primeiro"}
                disabled={!cepFound}
                className={getInputClasses(errors.bairro, false, !cepFound)}
              />
            )}
          />
          {errors.bairro && <small className={`${colors.errorText} text-sm mt-1 block`}>{errors.bairro.message}</small>}
        </div>

        <div>
          <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>
            Cidade <span className={colors.requiredMark}>*</span>
          </label>
          <Controller
            name="cidade"
            control={control}
            rules={{ required: "Cidade é obrigatória" }}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder={cepFound ? "Nome da cidade" : "Digite o CEP primeiro"}
                disabled={!cepFound}
                className={getInputClasses(errors.cidade, false, !cepFound)}
              />
            )}
          />
          {errors.cidade && <small className={`${colors.errorText} text-sm mt-1 block`}>{errors.cidade.message}</small>}
        </div>

        <div>
          <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>
            UF <span className={colors.requiredMark}>*</span>
          </label>
          <Controller
            name="estado"
            control={control}
            rules={{ required: "Estado é obrigatório" }}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder={cepFound ? "Estado" : "Digite o CEP primeiro"}
                disabled={!cepFound}
                maxLength={2}
                className={`${getInputClasses(errors.estado, false, !cepFound)} uppercase`}
              />
            )}
          />
          {errors.estado && <small className={`${colors.errorText} text-sm mt-1 block`}>{errors.estado.message}</small>}
        </div>
      </div>

      {/* Coordenadas e Mapa */}
      {cepFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`space-y-4 pt-6 border-t ${colors.sectionBorder}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`text-lg font-bold ${colors.headingText}`}>Localização Exata</h4>
              <p className={`text-sm ${colors.subtitleText}`}>Ajuste a localização no mapa se necessário</p>
            </div>
            <Button
              type="button"
              onClick={() => setShowMapModal(true)}
              className={`${colors.primaryBtn} border-0 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all`}
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Abrir Mapa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>Latitude</label>
              <Controller
                name="latitude"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    value={field.value?.toFixed(6) || ""}
                    disabled
                    className={`${getInputClasses(false, false, true)}`}
                  />
                )}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${colors.labelText} mb-2`}>Longitude</label>
              <Controller
                name="longitude"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    value={field.value?.toFixed(6) || ""}
                    disabled
                    className={`${getInputClasses(false, false, true)}`}
                  />
                )}
              />
            </div>
          </div>

          {latitude && longitude && (
            <div className={`${colors.successBg} border rounded-xl p-4`}>
              <p className={`text-sm ${colors.headingText} flex items-center gap-2`}>
                <Check className={`w-4 h-4 ${colors.successText}`} />
                <span>
                  Localização registrada com sucesso! Você pode ajustar no mapa se necessário.
                </span>
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Modal do Mapa */}
      <InteractiveMapModal
        visible={showMapModal}
        onHide={() => setShowMapModal(false)}
        currentLocation={currentLocation}
        endereco={watch("rua") + ", " + watch("numero") + " - " + watch("bairro") + ", " + watch("cidade") + " - " + watch("estado")}
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
  const [isSearchingAddress, setIsSearchingAddress] = useState(false)

  useEffect(() => {
    setSelectedLocation(currentLocation)
  }, [currentLocation])

  // Cores dinâmicas baseadas no tema
  const colors = {
    // Modal background
    modalBg: isDark ? "bg-[#1A1715]" : "bg-white",
    headerBg: isDark ? "bg-[#1A1715]" : "bg-white",
    contentBg: isDark ? "bg-[#0D0B0A]" : "bg-gray-50",

    // Borders
    border: isDark ? "border-[#2D2925]" : "border-[#d8ccc4]",

    // Text
    headingText: isDark ? "text-[#F5F0EB]" : "text-[#2a2420]",
    subtitleText: isDark ? "text-[#B8AEA4]" : "text-[#4f6f64]",
    mutedText: isDark ? "text-[#7A716A]" : "text-[#6b5d57]",

    // Icons
    iconBg: "bg-gradient-to-br from-[#db6f57] to-[#c55a42]",
    closeIconBg: isDark ? "bg-[#E07A62]/10" : "bg-[#db6f57]/20",
    closeIconColor: isDark ? "text-[#E07A62]" : "text-[#db6f57]",

    // Info boxes
    infoBg: isDark ? "bg-[#E07A62]/10 border-[#E07A62]/20" : "bg-gradient-to-r from-[#db6f57]/10 to-[#c55a42]/10 border-[#db6f57]/20",
    infoText: isDark ? "text-[#F5F0EB]" : "text-[#2a2420]",
    tipBg: isDark ? "bg-[#E07A62]/10 border-[#E07A62]/20" : "bg-yellow-50 border-yellow-200",
    tipText: isDark ? "text-[#E07A62]" : "text-yellow-800",

    // Inputs
    inputBg: isDark ? "bg-[#1A1715]" : "bg-white",
    inputBorder: isDark ? "border-[#2D2925]" : "border-[#d8ccc4]",
    inputFocus: isDark ? "focus:border-[#E07A62]" : "focus:border-[#db6f57]",
    inputText: isDark ? "text-[#F5F0EB]" : "text-[#2a2420]",

    // Buttons
    primaryBtn: "bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white",
    secondaryBtn: isDark
      ? "bg-transparent text-[#B8AEA4] border-2 border-[#2D2925] hover:border-[#E07A62]"
      : "bg-transparent text-[#4f6f64] border-2 border-[#d8ccc4] hover:border-[#4f6f64]",
    googleBtn: "bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white",
    viewMapBtn: isDark
      ? "bg-[#1A1715] text-[#B8AEA4] border-2 border-[#2D2925] hover:border-[#E07A62]"
      : "bg-white text-[#4f6f64] border-2 border-[#d8ccc4] hover:border-[#4f6f64]",
  }

  const handleCoordinateChange = (type: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setSelectedLocation((prev) => ({
        lat: type === 'lat' ? numValue : prev?.lat || 0,
        lng: type === 'lng' ? numValue : prev?.lng || 0,
      }))
    }
  }

  // Handler para quando o mapa é clicado
  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng })
  }

  return (
    <Dialog
      modal
      visible={visible}
      onHide={onHide}
      style={{ width: "90vw", maxWidth: "900px" }}
      className={`${colors.modalBg} rounded-2xl`}
      content={() => (
        <div className={`${colors.modalBg} rounded-2xl overflow-hidden`}>
          {/* Header */}
          <div className={`flex items-center justify-between gap-3 px-6 py-4 border-b ${colors.border}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${colors.headingText}`}>Ajuste a Localização</h3>
                <p className={`text-xs ${colors.subtitleText}`}>Clique no mapa para selecionar a posição exata</p>
              </div>
            </div>

            <div
              className={`w-10 h-10 rounded-xl cursor-pointer ${colors.closeIconBg} flex items-center justify-center hover:scale-105 transition-all`}
              onClick={onHide}
            >
              <X className={`w-5 h-5 ${colors.closeIconColor}`} />
            </div>
          </div>

          {/* Content */}
          <div className={`space-y-6 p-6 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary scrollbar-track-transparent ${colors.contentBg}`}>
            {/* Instruções */}
            <div className={`${colors.infoBg} border rounded-xl p-4`}>
              <p className={`text-sm ${colors.infoText} flex items-center gap-2 mb-2`}>
                <MapIcon className="w-4 h-4 text-[#db6f57]" />
                <strong>Como ajustar a localização:</strong>
              </p>
              <ul className={`text-sm ${colors.subtitleText} space-y-1 ml-6 list-disc`}>
                <li>Clique diretamente no mapa para mover o marcador</li>
                <li>Use a busca para encontrar um endereço específico</li>
                <li>Arraste o mapa para explorar a região</li>
              </ul>
            </div>

            {/* Mapa Interativo */}
            <div className="space-y-2">
              <h4 className={`text-sm font-bold ${colors.headingText}`}>Mapa Interativo</h4>
              <MapaCaptura
                latInicial={selectedLocation?.lat}
                lngInicial={selectedLocation?.lng}
                aoSelecionar={handleMapClick}
                isDark={isDark}
              />
            </div>

            {/* Coordenadas Atuais */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-bold ${colors.headingText}`}>Coordenadas Selecionadas:</h4>
                {isSearchingAddress && (
                  <div className={`flex items-center gap-2 text-xs ${colors.subtitleText}`}>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Atualizando...
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold ${colors.headingText} mb-2`}>
                    Latitude
                  </label>
                  <InputText
                    value={selectedLocation?.lat.toFixed(6) || ""}
                    onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                    placeholder="-23.550520"
                    className={`w-full px-4 py-3 border-2 ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} rounded-xl ${colors.inputFocus} transition-all`}
                  />
                  <small className={`text-xs ${colors.mutedText} mt-1 block`}>
                    Exemplo: -23.550520
                  </small>
                </div>
                <div>
                  <label className={`block text-sm font-semibold ${colors.headingText} mb-2`}>
                    Longitude
                  </label>
                  <InputText
                    value={selectedLocation?.lng.toFixed(6) || ""}
                    onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                    placeholder="-46.633308"
                    className={`w-full px-4 py-3 border-2 ${colors.inputBorder} ${colors.inputBg} ${colors.inputText} rounded-xl ${colors.inputFocus} transition-all`}
                  />
                  <small className={`text-xs ${colors.mutedText} mt-1 block`}>
                    Exemplo: -46.633308
                  </small>
                </div>
              </div>
            </div>

            {/* Alternativa: Google Maps */}
            <div className={`${colors.tipBg} border rounded-xl p-4`}>
              <p className={`text-sm ${colors.tipText} flex items-start gap-2`}>
                <span className="text-lg">💡</span>
                <span>
                  <strong>Alternativa:</strong> Você também pode encontrar coordenadas precisas no Google Maps.
                  Clique com o botão direito no local desejado e copie as coordenadas.
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  const searchQuery = encodeURIComponent(endereco)
                  window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank')
                }}
                className={`flex-1 ${colors.googleBtn} border-0 px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2`}
              >
                <MapIcon className="w-4 h-4" />
                Abrir no Google Maps
              </Button>

              {selectedLocation && (
                <Button
                  type="button"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/@${selectedLocation.lat},${selectedLocation.lng},18z`,
                      '_blank'
                    )
                  }}
                  className={`flex-1 ${colors.viewMapBtn} px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2`}
                >
                  <MapIcon className="w-4 h-4" />
                  Ver no Google Maps
                </Button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`flex gap-3 justify-end p-6 border-t ${colors.border} ${colors.modalBg}`}>
            <Button
              type="button"
              label="Cancelar"
              onClick={onHide}
              className={`${colors.secondaryBtn} px-6 py-2 rounded-xl text-sm font-semibold transition-all`}
            />
            <Button
              type="button"
              label="Confirmar Localização"
              icon={<Check className="mr-2 w-4 h-4" />}
              onClick={() => {
                if (selectedLocation) {
                  onLocationSelect(selectedLocation.lat, selectedLocation.lng)
                }
              }}
              disabled={!selectedLocation}
              className={`${colors.primaryBtn} border-0 px-6 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-all disabled:opacity-60`}
            />
          </div>
        </div>
      )}
    />
  )
}
