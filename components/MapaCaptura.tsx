'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin, Loader2 } from 'lucide-react';

// Corrige o ícone padrão do Leaflet que quebra no Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Componente para atualizar o centro do mapa quando busca
function MoverMapa({ coords }: { coords: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([coords.lat, coords.lng], 16);
  }, [coords, map]);
  return null;
}

// Componente para capturar clique no mapa
function CliqueMapa({ setPos }: { setPos: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      setPos(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapaCapturaProps {
  latInicial?: number | string;
  lngInicial?: number | string;
  aoSelecionar: (lat: number, lng: number) => void;
  isDark?: boolean;
  endereco?: string;
}

export default function MapaCaptura({ latInicial, lngInicial, aoSelecionar,endereco, isDark = false }: MapaCapturaProps) {
  // Posição inicial (Se não tiver, usa o centro do Brasil ou SP)
  const [posicao, setPosicao] = useState({
    lat: Number(latInicial) || -23.55052,
    lng: Number(lngInicial) || -46.63330
  });

  const [busca, setBusca] = useState(endereco??'');
  const [carregando, setCarregando] = useState(false);

  // Atualiza posição interna se o pai mandar novos props
  useEffect(() => {
    if (latInicial && lngInicial) {
      setPosicao({ lat: Number(latInicial), lng: Number(lngInicial) });
    }
  }, [latInicial, lngInicial]);

  const buscarEndereco = async () => {
    if (!busca) return;
    setCarregando(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(busca)}`);
      const data = await res.json();

      if (data && data.length > 0) {
        const novaLat = parseFloat(data[0].lat);
        const novaLng = parseFloat(data[0].lon);
        const novaPos = { lat: novaLat, lng: novaLng };

        setPosicao(novaPos);
        aoSelecionar(novaLat, novaLng);
      } else {
        alert('Endereço não encontrado!');
      }
    } catch (error) {
      alert('Erro ao buscar endereço.');
    } finally {
      setCarregando(false);
    }
  };

  // Estilos baseados no tema
  const styles = {
    container: "space-y-3",
    searchContainer: "flex gap-2",
    inputWrapper: "relative flex-1",
    input: isDark
      ? "w-full bg-[#1A1715] border border-[#2D2925] p-2.5 pl-10 rounded-xl text-[#F5F0EB] text-sm focus:border-[#E07A62] outline-none transition-all placeholder:text-[#7A716A]"
      : "w-full bg-white border border-[#d8ccc4] p-2.5 pl-10 rounded-xl text-[#2a2420] text-sm focus:border-[#db6f57] outline-none transition-all placeholder:text-[#9ca3af]",
    inputIcon: isDark ? "text-[#7A716A]" : "text-[#9ca3af]",
    searchButton: "bg-gradient-to-r from-[#db6f57] to-[#c55a42] hover:from-[#c55a42] hover:to-[#b04d3a] text-white px-4 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105",
    mapContainer: isDark
      ? "h-64 w-full rounded-xl overflow-hidden border-2 border-[#2D2925] relative z-0 shadow-lg"
      : "h-64 w-full rounded-xl overflow-hidden border-2 border-[#d8ccc4] relative z-0 shadow-lg",
    hint: isDark
      ? "text-[10px] text-[#7A716A] text-center flex items-center justify-center gap-1"
      : "text-[10px] text-[#6b5d57] text-center flex items-center justify-center gap-1",
  };

  return (
    <div className={styles.container}>
      {/* BARRA DE BUSCA */}
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Buscar endereço (Ex: Av Paulista, 1000)"
            className={styles.input}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarEndereco()}
          />
          <MapPin className={`absolute left-3 top-3 ${styles.inputIcon}`} size={16} />
        </div>
        <button
          type="button"
          onClick={buscarEndereco}
          disabled={carregando}
          className={styles.searchButton}
        >
          {carregando ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Search size={16} />
          )}
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* MAPA */}
      <div className={styles.mapContainer}>
        <MapContainer
          center={[posicao.lat, posicao.lng]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={[posicao.lat, posicao.lng]} icon={icon} />
          <MoverMapa coords={posicao} />
          <CliqueMapa setPos={(lat, lng) => {
            setPosicao({ lat, lng });
            aoSelecionar(lat, lng);
          }} />
        </MapContainer>
      </div>

      <p className={styles.hint}>
        <MapPin size={10} />
        Clique no mapa para ajustar a posição exata do pino
      </p>
    </div>
  );
}
