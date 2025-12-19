export const themes = {
  masculine_default: {
    id: "masculine_default",
    name: "Masculino Default",
    type: "default",
    isDark: true,
    colors: {
      // Cores principais (já existentes)
      primary: "#FE9A00",
      secondary: "#FFB900",
      accent: "#4A5568",
      background: "#0A0A0A",
      text: "#fff",
      textSecondary: "#A0AEC0",
      cardBackground: "#262626",
      cardBackgroundSecondary: "#171717",
      buttonText: "#FFFFFF",
      backgroundLinear: "linear-gradient(135deg, #FE9A00, #FFB900)",

      // Cores expandidas para estados e componentes futuros
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",

      // Cores de borda e divisores
      border: "#374151",
      borderLight: "#4B5563",
      divider: "#374151",

      // Cores de overlay e modal
      overlay: "rgba(0, 0, 0, 0.75)",
      modalBackground: "#1F2937",

      // Cores de input e form
      inputBackground: "#374151",
      inputBorder: "#4B5563",
      inputFocus: "#FE9A00",
      placeholder: "#9CA3AF",

      // Cores de navegação
      navBackground: "#111827",
      navHover: "#1F2937",
      navActive: "#FE9A00",

      // Cores de status
      online: "#10B981",
      offline: "#6B7280",
      away: "#F59E0B",
      busy: "#EF4444",
    },
    fonts: {
      heading: "Poppins, sans-serif",
      body: "Poppins, sans-serif",
      mono: '"Fira Code", "Courier New", monospace',

      // Tamanhos de fonte
      sizes: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
      },

      // Pesos de fonte
      weights: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      // Altura de linha
      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
        loose: "2",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      small: "0.5rem",
      medium: "1rem",
      large: "1.5rem",
      xl: "2rem",
      full: "9999px",
    },

    // Sistema de espaçamento
    spacing: {
      xs: "0.25rem", // 4px
      sm: "0.5rem", // 8px
      md: "1rem", // 16px
      lg: "1.5rem", // 24px
      xl: "2rem", // 32px
      "2xl": "3rem", // 48px
      "3xl": "4rem", // 64px
      "4xl": "6rem", // 96px
      "5xl": "8rem", // 128px
    },

    // Sistema de sombras
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",

      // Sombras coloridas baseadas no tema
      primaryGlow: "0 0 20px rgba(254, 154, 0, 0.3)",
      secondaryGlow: "0 0 20px rgba(255, 185, 0, 0.3)",
      errorGlow: "0 0 20px rgba(239, 68, 68, 0.3)",
      successGlow: "0 0 20px rgba(16, 185, 129, 0.3)",
    },

    // Configurações de transição
    transitions: {
      fast: "150ms ease-in-out",
      normal: "300ms ease-in-out",
      slow: "500ms ease-in-out",

      // Transições específicas
      colors: "200ms ease-in-out",
      transform: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: "200ms ease-in-out",
      shadow: "300ms ease-in-out",
    },

    // Valores de opacidade
    opacity: {
      disabled: 0.6,
      hover: 0.8,
      focus: 0.9,
      overlay: 0.75,
      subtle: 0.4,
      medium: 0.6,
      high: 0.8,
    },

    // Z-index para camadas
    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },

    // Breakpoints para responsividade
    breakpoints: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    // Efeitos especiais
    effects: {
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      backdropBlur: {
        sm: "blur(4px)",
        base: "blur(8px)",
        md: "blur(12px)",
        lg: "blur(16px)",
        xl: "blur(24px)",
      },
    },

    // Configurações de componentes específicos
    components: {
      button: {
        minHeight: "44px",
        iconSpacing: "8px",
      },
      input: {
        minHeight: "44px",
        iconSpacing: "12px",
      },
      card: {
        defaultPadding: "24px",
        headerPadding: "20px",
        footerPadding: "16px",
      },
      modal: {
        maxWidth: "500px",
        padding: "32px",
      },
      toast: {
        width: "400px",
        padding: "16px",
      },
    },
  },

  masculinoModerno: {
    id: "masculinoModerno",
    name: "Masculino Moderno",
    type: "masculino",
    isDark: true,
    colors: {
      primary: "#B0B8C1",
      secondary: "#2C2E34",
      accent: "#556B8C",
      background: "#15161B",
      text: "#F5F7FA",
      textSecondary: "#B0B8C1",
      cardBackground: "#23252B",
      cardBackgroundSecondary: "#2E3036",
      buttonText: "#15161B",
      backgroundLinear: "linear-gradient(135deg, #1E1F26, #2C2E34)",

      success: "#22C55E",
      warning: "#EAB308",
      error: "#DC2626",
      info: "#3B82F6",

      border: "#3F4147",
      borderLight: "#4A4D54",
      divider: "#3F4147",

      overlay: "rgba(0, 0, 0, 0.8)",
      modalBackground: "#1F2026",

      inputBackground: "#2C2E34",
      inputBorder: "#3F4147",
      inputFocus: "#556B8C",
      placeholder: "#8B92A5",

      navBackground: "#0F1014",
      navHover: "#1E1F26",
      navActive: "#556B8C",

      online: "#22C55E",
      offline: "#6B7280",
      away: "#EAB308",
      busy: "#DC2626",
    },
    fonts: {
      heading: '"Roboto Condensed", sans-serif',
      body: '"Open Sans", sans-serif',
      mono: '"JetBrains Mono", monospace',

      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

      weights: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
        loose: "2",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      small: "0.5rem",
      medium: "1rem",
      large: "1.5rem",
      xl: "2rem",
      full: "9999px",
    },

    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "6rem",
      "5xl": "8rem",
    },

    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",

      primaryGlow: "0 0 20px rgba(85, 107, 140, 0.4)",
      secondaryGlow: "0 0 20px rgba(44, 46, 52, 0.4)",
      errorGlow: "0 0 20px rgba(220, 38, 38, 0.4)",
      successGlow: "0 0 20px rgba(34, 197, 94, 0.4)",
    },

    transitions: {
      fast: "150ms ease-in-out",
      normal: "300ms ease-in-out",
      slow: "500ms ease-in-out",
      colors: "200ms ease-in-out",
      transform: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: "200ms ease-in-out",
      shadow: "300ms ease-in-out",
    },

    opacity: {
      disabled: 0.6,
      hover: 0.8,
      focus: 0.9,
      overlay: 0.8,
      subtle: 0.4,
      medium: 0.6,
      high: 0.8,
    },

    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },

    breakpoints: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    effects: {
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      backdropBlur: {
        sm: "blur(4px)",
        base: "blur(8px)",
        md: "blur(12px)",
        lg: "blur(16px)",
        xl: "blur(24px)",
      },
    },

    components: {
      button: {
        minHeight: "44px",
        iconSpacing: "8px",
      },
      input: {
        minHeight: "44px",
        iconSpacing: "12px",
      },
      card: {
        defaultPadding: "24px",
        headerPadding: "20px",
        footerPadding: "16px",
      },
      modal: {
        maxWidth: "500px",
        padding: "32px",
      },
      toast: {
        width: "400px",
        padding: "16px",
      },
    },
  },

  masculinoClassico: {
    id: "masculinoClassico",
    name: "Masculino Clássico",
    type: "masculino",
    isDark: false,
    colors: {
      primary: "#6B4F4F",
      secondary: "#A17C6B",
      accent: "#D4A5A5",
      background: "#F5EFE6",
      text: "#423838",
      textSecondary: "#7D6E6E",
      cardBackground: "#FFFFFF",
      cardBackgroundSecondary: "#FBF8F3",
      buttonText: "#FFFFFF",
      backgroundLinear: "linear-gradient(135deg, #6B4F4F, #A17C6B)",

      success: "#059669",
      warning: "#D97706",
      error: "#DC2626",
      info: "#2563EB",

      border: "#D1C7B8",
      borderLight: "#E5DDD0",
      divider: "#D1C7B8",

      overlay: "rgba(107, 79, 79, 0.6)",
      modalBackground: "#FFFFFF",

      inputBackground: "#FFFFFF",
      inputBorder: "#D1C7B8",
      inputFocus: "#6B4F4F",
      placeholder: "#9CA3AF",

      navBackground: "#FFFFFF",
      navHover: "#F5EFE6",
      navActive: "#6B4F4F",

      online: "#059669",
      offline: "#6B7280",
      away: "#D97706",
      busy: "#DC2626",
    },
    fonts: {
      heading: '"Playfair Display", serif',
      body: '"Lato", sans-serif',
      mono: '"Source Code Pro", monospace',

      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

      weights: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
        loose: "2",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      small: "0.5rem",
      medium: "1rem",
      large: "1.5rem",
      xl: "2rem",
      full: "9999px",
    },

    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "6rem",
      "5xl": "8rem",
    },

    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(107, 79, 79, 0.05)",
      base: "0 1px 3px 0 rgba(107, 79, 79, 0.1), 0 1px 2px 0 rgba(107, 79, 79, 0.06)",
      md: "0 4px 6px -1px rgba(107, 79, 79, 0.1), 0 2px 4px -1px rgba(107, 79, 79, 0.06)",
      lg: "0 10px 15px -3px rgba(107, 79, 79, 0.1), 0 4px 6px -2px rgba(107, 79, 79, 0.05)",
      xl: "0 20px 25px -5px rgba(107, 79, 79, 0.1), 0 10px 10px -5px rgba(107, 79, 79, 0.04)",
      inner: "inset 0 2px 4px 0 rgba(107, 79, 79, 0.06)",

      primaryGlow: "0 0 20px rgba(107, 79, 79, 0.3)",
      secondaryGlow: "0 0 20px rgba(161, 124, 107, 0.3)",
      errorGlow: "0 0 20px rgba(220, 38, 38, 0.3)",
      successGlow: "0 0 20px rgba(5, 150, 105, 0.3)",
    },

    transitions: {
      fast: "150ms ease-in-out",
      normal: "300ms ease-in-out",
      slow: "500ms ease-in-out",
      colors: "200ms ease-in-out",
      transform: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: "200ms ease-in-out",
      shadow: "300ms ease-in-out",
    },

    opacity: {
      disabled: 0.6,
      hover: 0.8,
      focus: 0.9,
      overlay: 0.6,
      subtle: 0.4,
      medium: 0.6,
      high: 0.8,
    },

    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },

    breakpoints: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    effects: {
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      backdropBlur: {
        sm: "blur(4px)",
        base: "blur(8px)",
        md: "blur(12px)",
        lg: "blur(16px)",
        xl: "blur(24px)",
      },
    },

    components: {
      button: {
        minHeight: "44px",
        iconSpacing: "8px",
      },
      input: {
        minHeight: "44px",
        iconSpacing: "12px",
      },
      card: {
        defaultPadding: "24px",
        headerPadding: "20px",
        footerPadding: "16px",
      },
      modal: {
        maxWidth: "500px",
        padding: "32px",
      },
      toast: {
        width: "400px",
        padding: "16px",
      },
    },
  },

  femininoElegante: {
    id: "femininoElegante",
    name: "Feminino Elegante",
    type: "feminino",
    isDark: false,
    colors: {
      primary: "#B08D9A",
      secondary: "#D8BFD8",
      accent: "#F0E6EF",
      background: "#FAF7FA",
      text: "#4B4453",
      textSecondary: "#7E7385",
      cardBackground: "#FFFFFF",
      cardBackgroundSecondary: "#F5F0F4",
      buttonText: "#FFFFFF",
      backgroundLinear: "linear-gradient(135deg, #B08D9A, #D8BFD8)",

      success: "#22C55E",
      warning: "#D97706",
      error: "#DC2626",
      info: "#7C3AED",

      border: "#E5D9E3",
      borderLight: "#F0E6EF",
      divider: "#E5D9E3",

      overlay: "rgba(176, 141, 154, 0.6)",
      modalBackground: "#FFFFFF",

      inputBackground: "#FFFFFF",
      inputBorder: "#E5D9E3",
      inputFocus: "#B08D9A",
      placeholder: "#A78B96",

      navBackground: "#FFFFFF",
      navHover: "#FAF7FA",
      navActive: "#B08D9A",

      online: "#059669",
      offline: "#9CA3AF",
      away: "#D97706",
      busy: "#DC2626",
    },
    fonts: {
      heading: '"Cormorant Garamond", serif',
      body: '"Raleway", sans-serif',
      mono: '"IBM Plex Mono", monospace',

      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

      weights: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
        loose: "2",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      small: "0.5rem",
      medium: "1rem",
      large: "1.5rem",
      xl: "2rem",
      full: "9999px",
    },

    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "6rem",
      "5xl": "8rem",
    },

    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(176, 141, 154, 0.05)",
      base: "0 1px 3px 0 rgba(176, 141, 154, 0.1), 0 1px 2px 0 rgba(176, 141, 154, 0.06)",
      md: "0 4px 6px -1px rgba(176, 141, 154, 0.1), 0 2px 4px -1px rgba(176, 141, 154, 0.06)",
      lg: "0 10px 15px -3px rgba(176, 141, 154, 0.1), 0 4px 6px -2px rgba(176, 141, 154, 0.05)",
      xl: "0 20px 25px -5px rgba(176, 141, 154, 0.1), 0 10px 10px -5px rgba(176, 141, 154, 0.04)",
      inner: "inset 0 2px 4px 0 rgba(176, 141, 154, 0.06)",

      primaryGlow: "0 0 20px rgba(176, 141, 154, 0.3)",
      secondaryGlow: "0 0 20px rgba(216, 191, 216, 0.3)",
      errorGlow: "0 0 20px rgba(220, 38, 38, 0.3)",
      successGlow: "0 0 20px rgba(5, 150, 105, 0.3)",
    },

    transitions: {
      fast: "150ms ease-in-out",
      normal: "300ms ease-in-out",
      slow: "500ms ease-in-out",
      colors: "200ms ease-in-out",
      transform: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: "200ms ease-in-out",
      shadow: "300ms ease-in-out",
    },

    opacity: {
      disabled: 0.6,
      hover: 0.8,
      focus: 0.9,
      overlay: 0.6,
      subtle: 0.4,
      medium: 0.6,
      high: 0.8,
    },

    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },

    breakpoints: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    effects: {
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      backdropBlur: {
        sm: "blur(4px)",
        base: "blur(8px)",
        md: "blur(12px)",
        lg: "blur(16px)",
        xl: "blur(24px)",
      },
    },

    components: {
      button: {
        minHeight: "44px",
        iconSpacing: "8px",
      },
      input: {
        minHeight: "44px",
        iconSpacing: "12px",
      },
      card: {
        defaultPadding: "24px",
        headerPadding: "20px",
        footerPadding: "16px",
      },
      modal: {
        maxWidth: "500px",
        padding: "32px",
      },
      toast: {
        width: "400px",
        padding: "16px",
      },
    },
  },

  femininoModerno: {
    id: "femininoModerno",
    name: "Feminino Moderno",
    type: "feminino",
    isDark: false,
    colors: {
      primary: "#FF69B4",
      secondary: "#FFC0CB",
      accent: "#ADD8E6",
      background: "#FFF0F5",
      text: "#333333",
      textSecondary: "#555555",
      cardBackground: "#FFFFFF",
      cardBackgroundSecondary: "#FFF8FA",
      buttonText: "#FFF0F5",
      backgroundLinear: "linear-gradient(135deg, #FF69B4, #FFC0CB)",

      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",

      border: "#F8BBD9",
      borderLight: "#FDD7E4",
      divider: "#F8BBD9",

      overlay: "rgba(255, 105, 180, 0.6)",
      modalBackground: "#FFFFFF",

      inputBackground: "#FFFFFF",
      inputBorder: "#F8BBD9",
      inputFocus: "#FF69B4",
      placeholder: "#B794A8",

      navBackground: "#FFFFFF",
      navHover: "#FFF0F5",
      navActive: "#FF69B4",

      online: "#10B981",
      offline: "#9CA3AF",
      away: "#F59E0B",
      busy: "#EF4444",
    },
    fonts: {
      heading: '"Poppins", sans-serif',
      body: '"Montserrat", sans-serif',
      mono: '"Cascadia Code", monospace',

      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

      weights: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
        loose: "2",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      small: "0.5rem",
      medium: "1rem",
      large: "1.5rem",
      xl: "2rem",
      full: "9999px",
    },

    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "6rem",
      "5xl": "8rem",
    },

    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(255, 105, 180, 0.05)",
      base: "0 1px 3px 0 rgba(255, 105, 180, 0.1), 0 1px 2px 0 rgba(255, 105, 180, 0.06)",
      md: "0 4px 6px -1px rgba(255, 105, 180, 0.1), 0 2px 4px -1px rgba(255, 105, 180, 0.06)",
      lg: "0 10px 15px -3px rgba(255, 105, 180, 0.1), 0 4px 6px -2px rgba(255, 105, 180, 0.05)",
      xl: "0 20px 25px -5px rgba(255, 105, 180, 0.1), 0 10px 10px -5px rgba(255, 105, 180, 0.04)",
      inner: "inset 0 2px 4px 0 rgba(255, 105, 180, 0.06)",

      primaryGlow: "0 0 20px rgba(255, 105, 180, 0.4)",
      secondaryGlow: "0 0 20px rgba(255, 192, 203, 0.4)",
      errorGlow: "0 0 20px rgba(239, 68, 68, 0.4)",
      successGlow: "0 0 20px rgba(16, 185, 129, 0.4)",
    },

    transitions: {
      fast: "150ms ease-in-out",
      normal: "300ms ease-in-out",
      slow: "500ms ease-in-out",
      colors: "200ms ease-in-out",
      transform: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: "200ms ease-in-out",
      shadow: "300ms ease-in-out",
    },

    opacity: {
      disabled: 0.6,
      hover: 0.8,
      focus: 0.9,
      overlay: 0.6,
      subtle: 0.4,
      medium: 0.6,
      high: 0.8,
    },

    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },

    breakpoints: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    effects: {
      blur: {
        sm: "4px",
        base: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      backdropBlur: {
        sm: "blur(4px)",
        base: "blur(8px)",
        md: "blur(12px)",
        lg: "blur(16px)",
        xl: "blur(24px)",
      },
    },

    components: {
      button: {
        minHeight: "44px",
        iconSpacing: "8px",
      },
      input: {
        minHeight: "44px",
        iconSpacing: "12px",
      },
      card: {
        defaultPadding: "24px",
        headerPadding: "20px",
        footerPadding: "16px",
      },
      modal: {
        maxWidth: "500px",
        padding: "32px",
      },
      toast: {
        width: "400px",
        padding: "16px",
      },
    },
  },

  belloryElegante: {
  id: "belloryElegante",
  name: "Bellory Elegante",
  type: "feminino",
  isDark: false,
  colors: {
    primary: "#C99A86", // rose gold
    secondary: "#9C7C5D", // rose gold mais escuro
    accent: "#1E3C64", // azul profundo (detalhe do logo)
    background: "#F8F5F3", // fundo geral, bege rosado suave
    text: "#4A3F35", // marrom acinzentado, elegante e legível
    textSecondary: "#7A6E65",

    cardBackground: "#fff", // mais claro que o fundo
    cardBackgroundSecondary: "#F2ECE8", // leve contraste
    buttonText: "#FFFFFF",

    backgroundLinear: "linear-gradient(135deg, #E2D7CF, #F0E9E4)",

    success: "#22C55E",
    warning: "#D97706",
    error: "#DC2626",
    info: "#1E3C64",

    border: "#E2D7CF",
    borderLight: "#F0E9E4",
    divider: "#E2D7CF",

    overlay: "rgba(200, 155, 123, 0.6)",
    modalBackground: "#FFFFFF",

    inputBackground: "#FFFFFF",
    inputBorder: "#E2D7CF",
    inputFocus: "#C89B7B",
    placeholder: "#A58E80",

    navBackground: "#FCFAF9",
    navHover: "#F8F5F3",
    navActive: "#C89B7B",

    online: "#059669",
    offline: "#9CA3AF",
    away: "#D97706",
    busy: "#DC2626",
  },

  fonts: {
    heading: '"Cormorant Garamond", serif',
    body: '"Raleway", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },

  borderRadius: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
    xl: "2rem",
    full: "9999px",
  },

  shadows: {
    base: "0 1px 3px 0 rgba(200, 155, 123, 0.1), 0 1px 2px 0 rgba(200, 155, 123, 0.06)",
    md: "0 4px 6px -1px rgba(200, 155, 123, 0.1), 0 2px 4px -1px rgba(200, 155, 123, 0.06)",
    lg: "0 10px 15px -3px rgba(200, 155, 123, 0.1), 0 4px 6px -2px rgba(200, 155, 123, 0.05)",
    primaryGlow: "0 0 20px rgba(200, 155, 123, 0.35)",
    accentGlow: "0 0 20px rgba(30, 60, 100, 0.35)",
  },
  }

}

// Tipo TypeScript para o tema (opcional, mas recomendado)
export type Theme = typeof themes.masculine_default

// Função helper para acessar propriedades do tema de forma segura
export const getThemeValue = (theme: Theme, path: string, fallback: any = undefined) => {
  return path.split(".").reduce((obj, key) => (obj as any)?.[key], theme) || fallback
}

// Função para criar variações de cor (mais claro/escuro)
export const createColorVariations = (baseColor: string) => {
  // Esta função pode ser implementada para gerar variações automáticas
  // Por enquanto, retorna o objeto base
  return {
    50: baseColor,
    100: baseColor,
    200: baseColor,
    300: baseColor,
    400: baseColor,
    500: baseColor, // cor base
    600: baseColor,
    700: baseColor,
    800: baseColor,
    900: baseColor,
  }
}
