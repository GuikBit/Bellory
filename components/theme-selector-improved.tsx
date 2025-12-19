import { Controller } from "react-hook-form"
import { Palette, Check, Moon, Sun, Sparkles, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

// Componente de Preview do Tema
const ThemePreview = ({ theme, isSelected }: { theme: any; isSelected: boolean }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.button
      type="button"
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 1 }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 w-full ${
        isSelected
          ? "border-[#db6f57] bg-gradient-to-br from-[#db6f57]/10 to-[#db6f57]/5 shadow-2xl"
          : "border-[#d8ccc4] hover:border-[#db6f57]/50 bg-white"
      }`}
    >
      {/* Badge de Seleção */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#db6f57] to-[#c55a42] shadow-lg flex items-center justify-center"
          >
            <Check className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header do Tema */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-lg text-[#2a2420]">{theme.name}</h4>
          {theme.isDark ? (
            <Moon className="w-5 h-5 text-[#4f6f64]" />
          ) : (
            <Sun className="w-5 h-5 text-[#db6f57]" />
          )}
        </div>
        <p className="text-xs text-[#4f6f64] capitalize">
          Tema {theme.type}
        </p>
      </div>

      {/* Preview Visual do Card */}
      <div 
        className="rounded-xl overflow-hidden mb-4 shadow-md transition-all duration-300"
        style={{ 
          backgroundColor: theme.colors.background,
          minHeight: '120px'
        }}
      >
        {/* Mini Header */}
        <div 
          className="px-3 py-2 flex items-center gap-2"
          style={{ 
            backgroundColor: theme.colors.cardBackground,
            borderBottom: `1px solid ${theme.colors.border}`
          }}
        >
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1">
            <div 
              className="h-2 rounded-full w-20 mb-1"
              style={{ backgroundColor: theme.colors.text, opacity: 0.8 }}
            />
            <div 
              className="h-1.5 rounded-full w-16"
              style={{ backgroundColor: theme.colors.textSecondary, opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Mini Content */}
        <div 
          className="p-3 space-y-2"
          style={{ backgroundColor: theme.colors.cardBackground }}
        >
          <div 
            className="h-2 rounded-full w-full"
            style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
          />
          <div 
            className="h-2 rounded-full w-4/5"
            style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
          />
          <div 
            className="h-2 rounded-full w-3/5"
            style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
          />
        </div>

        {/* Mini Button */}
        <div className="p-3">
          <div 
            className="h-8 rounded-lg flex items-center justify-center"
            style={{ 
              background: theme.colors.backgroundLinear || theme.colors.primary,
              color: theme.colors.buttonText
            }}
          >
            <span className="text-xs font-semibold">Botão</span>
          </div>
        </div>
      </div>

      {/* Paleta de Cores */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#4f6f64] font-medium">Cores Principais:</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          {[
            { color: theme.colors.primary, label: 'Primária' },
            { color: theme.colors.secondary, label: 'Secundária' },
            { color: theme.colors.accent, label: 'Destaque' },
            { color: theme.colors.background, label: 'Fundo' }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-8 h-8 rounded-full shadow-md ring-2 ring-white transition-all"
                style={{ backgroundColor: item.color }}
              />
              {showDetails && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#2a2420] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detalhes Expandidos */}
      <AnimatePresence>
        {/* {showDetails && ( */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-[#d8ccc4] overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#4f6f64]">Fonte Título:</span>
              <span className="font-semibold text-[#2a2420]" style={{ fontFamily: theme.fonts?.heading }}>
                Aa
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-[#4f6f64]">Fonte Corpo:</span>
              <span className="font-semibold text-[#2a2420]" style={{ fontFamily: theme.fonts?.body }}>
                Aa
              </span>
            </div>
          </motion.div>
        {/* )} */}
      </AnimatePresence>

      {/* Hover Indicator */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`,
        }}
      />
    </motion.button>
  )
}

// Componente Principal de Seleção de Tema
export const ThemeSelector = ({ control, errors, themeArray }: any) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#d8ccc4]">
        <div className="flex items-center gap-3 pb-4">
          <div className="w-12 h-12 rounded-xl bg-[#db6f57]/10 flex items-center justify-center">
            <Palette className="w-6 h-6 text-[#db6f57]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2a2420]">Escolha seu Tema</h3>
            <p className="text-sm text-[#4f6f64]">Personalize a identidade visual</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#db6f57] mb-1">
              {themeArray.length}
            </div>
            <div className="text-xs text-[#4f6f64]">Temas disponíveis</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#db6f57] mb-1">
              {themeArray.filter((t: any) => !t.isDark).length}
            </div>
            <div className="text-xs text-[#4f6f64]">Temas claros</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#db6f57] mb-1">
              {themeArray.filter((t: any) => t.isDark).length}
            </div>
            <div className="text-xs text-[#4f6f64]">Temas escuros</div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#db6f57]/10 to-[#c55a42]/10 border border-[#db6f57]/20"
      >
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-[#db6f57] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[#2a2420] font-medium">
              Passe o mouse sobre os temas para ver mais detalhes
            </p>
            <p className="text-xs text-[#4f6f64] mt-1">
              Você poderá personalizar cores e fontes depois na plataforma
            </p>
          </div>
        </div>
      </motion.div>

      {/* Themes Grid/List */}
      <Controller
        name="tema"
        control={control}
        rules={{ required: "Selecione um tema para continuar" }}
        render={({ field }) => (
          <motion.div
            layout
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 `}
          >
            {themeArray.map((tema: any, index: number) => (
              <motion.div
                key={tema.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => field.onChange(tema.id)}
                className=""
              >
                <ThemePreview 
                  theme={tema} 
                  isSelected={field.value === tema.id}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      />

      {/* Error Message */}
      <AnimatePresence>
        {errors.tema && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <p className="text-[#d15847] text-sm font-medium bg-[#d15847]/10 px-4 py-2 rounded-lg inline-block">
              {errors.tema.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Stats */}
      
    </div>
  )
}