import { useState, useEffect } from "react"
import { Controller } from "react-hook-form"
import { MapPin, Search, Loader2, Check, Map as MapIcon, Move, X } from "lucide-react"
import { InputMask } from "primereact/inputmask"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/HeroThemeContext"
import { cadastroThemeConfig } from "@/app/cadastro/page"

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
        const logradouro = watch("rua");
        const bairro = watch("bairro");
        const cidade = watch("cidade");
        const estado = watch("estado");

        // Ajuste: Remover 'data.localidade' e 'data.uf', usar as variáveis corretas
        await buscarCoordenadas(logradouro, cidade, estado, numero);
      }
    };
    fetchCoordenadas();
  }, [numero]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
        <div className="w-12 h-12 rounded-xl bg-[#4f6f64]/10 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-[#4f6f64]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#2a2420]">Localização</h3>
          <p className="text-sm text-[#4f6f64]">Endereço do estabelecimento</p>
        </div>
      </div>

      {/* CEP com busca automática */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
            CEP <span className="text-[#d15847]">*</span>
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
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all ${
                    errors.cep || cepError
                      ? "border-[#d15847]"
                      : cepFound
                      ? "border-[#4f6f64]"
                      : "border-[#d8ccc4] focus:border-[#4f6f64]"
                  }`}
                />
              )}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {isSearching ? (
                <Loader2 className="w-5 h-5 text-[#4f6f64] animate-spin" />
              ) : cepFound ? (
                <Check className="w-5 h-5 text-[#4f6f64]" />
              ) : (
                <Search className="w-5 h-5 text-[#9ca3af]" />
              )}
            </div>
          </div>
          {(errors.cep || cepError) && (
            <small className="text-[#d15847] text-sm mt-1 block">
              {errors.cep?.message || cepError}
            </small>
          )}
          {isSearching && (
            <small className="text-[#4f6f64] text-sm mt-1 block flex items-center gap-1">
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
              className="bg-[#db6f57]/10 border border-[#db6f57]/20 rounded-xl p-4"
            >
              <p className="text-sm text-[#6b2f2a] flex items-center gap-2">
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
          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
            Rua <span className="text-[#d15847]">*</span>
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
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                  !cepFound
                    ? "bg-gray-50 cursor-not-allowed opacity-60"
                    : errors.rua
                    ? "border-[#d15847]"
                    : "border-[#d8ccc4] focus:border-[#4f6f64]"
                }`}
              />
            )}
          />
          {errors.rua && <small className="text-[#d15847] text-sm mt-1 block">{errors.rua.message}</small>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
            Número <span className="text-[#d15847]">*</span>
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
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                  !cepFound
                    ? "bg-gray-50 cursor-not-allowed opacity-60"
                    : errors.numero
                    ? "border-[#d15847]"
                    : "border-[#d8ccc4] focus:border-[#4f6f64]"
                }`}
              />
            )}
          />
          {errors.numero && <small className="text-[#d15847] text-sm mt-1 block">{errors.numero.message}</small>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2a2420] mb-2">Complemento</label>
          <Controller
            name="complemento"
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder={cepFound ? "Opcional" : "Digite o CEP primeiro"}
                disabled={!cepFound}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                  !cepFound
                    ? "bg-gray-50 cursor-not-allowed opacity-60"
                    : "border-[#d8ccc4] focus:border-[#4f6f64]"
                }`}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
            Bairro <span className="text-[#d15847]">*</span>
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
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                  !cepFound
                    ? "bg-gray-50 cursor-not-allowed opacity-60"
                    : errors.bairro
                    ? "border-[#d15847]"
                    : "border-[#d8ccc4] focus:border-[#4f6f64]"
                }`}
              />
            )}
          />
          {errors.bairro && <small className="text-[#d15847] text-sm mt-1 block">{errors.bairro.message}</small>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
            Cidade <span className="text-[#d15847]">*</span>
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
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                  !cepFound
                    ? "bg-gray-50 cursor-not-allowed opacity-60"
                    : errors.cidade
                    ? "border-[#d15847]"
                    : "border-[#d8ccc4] focus:border-[#4f6f64]"
                }`}
              />
            )}
          />
          {errors.cidade && <small className="text-[#d15847] text-sm mt-1 block">{errors.cidade.message}</small>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
            UF <span className="text-[#d15847]">*</span>
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
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all uppercase ${
                  !cepFound
                    ? "bg-gray-50 cursor-not-allowed opacity-60"
                    : errors.estado
                    ? "border-[#d15847]"
                    : "border-[#d8ccc4] focus:border-[#4f6f64]"
                }`}
              />
            )}
          />
          {errors.estado && <small className="text-[#d15847] text-sm mt-1 block">{errors.estado.message}</small>}
        </div>
      </div>

      {/* Coordenadas e Mapa */}
      {cepFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-6 border-t border-[#d8ccc4]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-[#2a2420]">Localização Exata</h4>
              <p className="text-sm text-[#4f6f64]">Ajuste a localização no mapa se necessário</p>
            </div>
            <Button
              type="button"
              onClick={() => setShowMapModal(true)}
              className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Abrir Mapa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#2a2420] mb-2">Latitude</label>
              <Controller
                name="latitude"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    value={field.value?.toFixed(6) || ""}
                    disabled
                    className="w-full px-4 py-3 border-2 border-[#d8ccc4] rounded-xl bg-gray-50"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2a2420] mb-2">Longitude</label>
              <Controller
                name="longitude"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    value={field.value?.toFixed(6) || ""}
                    disabled
                    className="w-full px-4 py-3 border-2 border-[#d8ccc4] rounded-xl bg-gray-50"
                  />
                )}
              />
            </div>
          </div>

          {latitude && longitude && (
            <div className="bg-[#4f6f64]/10 border border-[#4f6f64]/20 rounded-xl p-4">
              <p className="text-sm text-[#2a2420] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4f6f64]" />
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
}

const InteractiveMapModal = ({ visible, onHide, currentLocation, endereco, onLocationSelect }: MapModalProps) => {
  const [selectedLocation, setSelectedLocation] = useState(currentLocation)
  const [isSearchingAddress, setIsSearchingAddress] = useState(false)

  useEffect(() => {
    setSelectedLocation(currentLocation)
  }, [currentLocation])

  // Função para buscar coordenadas de um endereço específico
  const buscarCoordenadas = async () => {
    if (!endereco) return

    setIsSearchingAddress(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&limit=1`
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        setSelectedLocation({ lat, lng })
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error)
    } finally {
      setIsSearchingAddress(false)
    }
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

  return (
    <Dialog
      modal
      visible={visible}
      onHide={onHide}
      style={{ width: "90vw", maxWidth: "900px" }}
      className="bg-white rounded-2xl"
      content={()=>(
        <>
          <div className="flex items-center justify-between gap-3 px-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#db6f57] to-[#c55a42] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2a2420]">Ajuste a Localização</h3>
                <p className="text-xs text-[#4f6f64]">Use o Google Maps para encontrar o ponto exato</p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-xl cursor-pointer bg-gradient-to-br from-[#db6f57]/20 to-[#c55a42]/20 flex items-center justify-center" onClick={onHide}>
              <X className="w-5 h-5 text-[#db6f57]" />
            </div>
          </div>

          <div className="space-y-6 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary scrollbar-track-transparent">        
            {/* Instruções principais */}
            <div className="bg-gradient-to-r from-[#db6f57]/10 to-[#c55a42]/10 border border-[#db6f57]/20 rounded-xl p-4">
              <p className="text-sm text-[#2a2420] flex items-center gap-2 mb-3">
                <MapIcon className="w-4 h-4 text-[#db6f57]" />
                <strong>Como encontrar as coordenadas exatas:</strong>
              </p>
              <ol className="text-sm text-[#4f6f64] space-y-2 ml-6 list-decimal">
                <li>Clique no botão "Abrir no Google Maps" abaixo</li>
                <li>No Google Maps, encontre e clique com o <strong>botão direito</strong> no local exato do seu estabelecimento</li>
                <li>Clique nas coordenadas que aparecem no topo (exemplo: -23.550520, -46.633308)</li>
                <li>As coordenadas serão copiadas automaticamente</li>
                <li>Cole nos campos "Latitude" e "Longitude" abaixo</li>
              </ol>
            </div>

            {/* Endereço atual */}
            {/* <div className="bg-[#4f6f64]/10 border border-[#4f6f64]/20 rounded-xl p-4">
              <p className="text-sm text-[#2a2420] mb-2">
                <strong>📍 Endereço:</strong>
              </p>
              <p className="text-sm text-[#4f6f64]">{endereco}</p>
            </div> */}

            {/* Botão para abrir Google Maps */}
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  const searchQuery = encodeURIComponent(endereco)
                  window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank')
                }}
                className="w-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white border-0 px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <MapIcon className="w-5 h-5" />
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
                  className="w-full bg-white text-[#4f6f64] border-2 border-[#d8ccc4] px-4 py-1.5 rounded-lg text-sm font-semibold hover:border-[#4f6f64] transition-all flex items-center justify-center gap-2"
                >
                  <MapIcon className="w-5 h-5" />
                  Ver localização atual no mapa
                </Button>
              )}
            </div>

            {/* Preview do mapa (somente visualização) */}
            {selectedLocation && (
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden border-2 border-[#d8ccc4] shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${selectedLocation.lat},${selectedLocation.lng}&zoom=16`}
                  allowFullScreen
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-[#d8ccc4]">
                  <p className="text-xs text-[#4f6f64] font-medium">Preview da localização</p>
                </div>
              </div>
            )}

            {/* Coordenadas Manuais */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#2a2420]">Cole as coordenadas aqui:</h4>
                {isSearchingAddress && (
                  <div className="flex items-center gap-2 text-xs text-[#4f6f64]">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Atualizando...
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                    Latitude
                  </label>
                  <InputText
                    value={selectedLocation?.lat.toFixed(6) || ""}
                    onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                    placeholder="-23.550520"
                    className="w-full px-4 py-3 border-2 border-[#d8ccc4] rounded-xl focus:border-[#db6f57] transition-all"
                  />
                  <small className="text-xs text-[#4f6f64] mt-1 block">
                    Exemplo: -23.550520
                  </small>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                    Longitude
                  </label>
                  <InputText
                    value={selectedLocation?.lng.toFixed(6) || ""}
                    onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                    placeholder="-46.633308"
                    className="w-full px-4 py-3 border-2 border-[#d8ccc4] rounded-xl focus:border-[#db6f57] transition-all"
                  />
                  <small className="text-xs text-[#4f6f64] mt-1 block">
                    Exemplo: -46.633308
                  </small>
                </div>
              </div>
            </div>

            {/* Dica extra */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="text-lg">💡</span>
                <span>
                  <strong>Dica:</strong> No Google Maps, quanto mais você der zoom, mais precisa será a localização. 
                  Procure identificar a entrada principal do seu estabelecimento.
                </span>
              </p>
            </div>

            {/* Botões de Ação */}

          </div>
          <div className="flex gap-3 justify-end p-4 ">
            <Button
              type="button"
              label="Cancelar"
              onClick={onHide}
              className="bg-transparent text-[#4f6f64] border-2 border-[#d8ccc4] px-4 py-1.5 rounded-lg text-sm font-semibold hover:border-[#4f6f64] transition-all"
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
              className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 px-4 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition-all disabled:opacity-60"
            />
          </div>
        </>

      )}
    />
  )
}