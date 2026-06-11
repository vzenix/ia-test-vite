import { generateRandomDNI } from './dni.js'
import { generateIBAN } from './iban.js'

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

export const PROVINCIAS = [
  { code: '01', name: 'Álava' }, { code: '02', name: 'Albacete' },
  { code: '03', name: 'Alicante' }, { code: '04', name: 'Almería' },
  { code: '05', name: 'Ávila' }, { code: '06', name: 'Badajoz' },
  { code: '07', name: 'Illes Balears' }, { code: '08', name: 'Barcelona' },
  { code: '09', name: 'Burgos' }, { code: '10', name: 'Cáceres' },
  { code: '11', name: 'Cádiz' }, { code: '12', name: 'Castellón' },
  { code: '13', name: 'Ciudad Real' }, { code: '14', name: 'Córdoba' },
  { code: '15', name: 'A Coruña' }, { code: '16', name: 'Cuenca' },
  { code: '17', name: 'Girona' }, { code: '18', name: 'Granada' },
  { code: '19', name: 'Guadalajara' }, { code: '20', name: 'Gipuzkoa' },
  { code: '21', name: 'Huelva' }, { code: '22', name: 'Huesca' },
  { code: '23', name: 'Jaén' }, { code: '24', name: 'León' },
  { code: '25', name: 'Lleida' }, { code: '26', name: 'La Rioja' },
  { code: '27', name: 'Lugo' }, { code: '28', name: 'Madrid' },
  { code: '29', name: 'Málaga' }, { code: '30', name: 'Murcia' },
  { code: '31', name: 'Navarra' }, { code: '32', name: 'Ourense' },
  { code: '33', name: 'Asturias' }, { code: '34', name: 'Palencia' },
  { code: '35', name: 'Las Palmas' }, { code: '36', name: 'Pontevedra' },
  { code: '37', name: 'Salamanca' }, { code: '38', name: 'Santa Cruz de Tenerife' },
  { code: '39', name: 'Cantabria' }, { code: '40', name: 'Segovia' },
  { code: '41', name: 'Sevilla' }, { code: '42', name: 'Soria' },
  { code: '43', name: 'Tarragona' }, { code: '44', name: 'Teruel' },
  { code: '45', name: 'Toledo' }, { code: '46', name: 'Valencia' },
  { code: '47', name: 'Valladolid' }, { code: '48', name: 'Bizkaia' },
  { code: '49', name: 'Zamora' }, { code: '50', name: 'Zaragoza' },
  { code: '51', name: 'Ceuta' }, { code: '52', name: 'Melilla' }
]

const CIUDADES_POR_PROVINCIA = {
  '01': ['Vitoria-Gasteiz', 'Amurrio', 'Llodio', 'Salvatierra', 'Ayala'],
  '02': ['Albacete', 'Almansa', 'Hellín', 'La Roda', 'Villarrobledo'],
  '03': ['Alicante', 'Elche', 'Orihuela', 'Benidorm', 'Alcoy', 'Torrevieja', 'Elda', 'Petrer'],
  '04': ['Almería', 'Roquetas de Mar', 'El Ejido', 'Níjar', 'Adra', 'Vícar'],
  '05': ['Ávila', 'Arévalo', 'Piedrahíta', 'Barco de Ávila', 'Cebreros'],
  '06': ['Badajoz', 'Mérida', 'Don Benito', 'Villanueva de la Serena', 'Almendralejo', 'Zafra'],
  '07': ['Palma de Mallorca', 'Calvià', 'Manacor', 'Inca', 'Llucmajor', 'Alcúdia'],
  '08': ['Barcelona', 'L\'Hospitalet de Llobregat', 'Badalona', 'Sabadell', 'Terrassa', 'Mataró', 'Santa Coloma de Gramenet', 'Sant Cugat del Vallès'],
  '09': ['Burgos', 'Miranda de Ebro', 'Aranda de Duero', 'Briviesca', 'Villarcayo'],
  '10': ['Cáceres', 'Plasencia', 'Navalmoral de la Mata', 'Trujillo', 'Coria'],
  '11': ['Cádiz', 'Jerez de la Frontera', 'Algeciras', 'San Fernando', 'El Puerto de Santa María', 'Chiclana de la Frontera', 'Sanlúcar de Barrameda', 'La Línea'],
  '12': ['Castellón de la Plana', 'Villarreal', 'Borriana', 'La Vall d\'Uixó', 'Benicarló', 'Onda'],
  '13': ['Ciudad Real', 'Puertollano', 'Tomelloso', 'Valdepeñas', 'Alcázar de San Juan', 'Daimiel'],
  '14': ['Córdoba', 'Lucena', 'Puente Genil', 'Cabra', 'Montilla', 'Priego de Córdoba'],
  '15': ['A Coruña', 'Santiago de Compostela', 'Ferrol', 'Narón', 'Oleiros', 'Carballo', 'Arteixo'],
  '16': ['Cuenca', 'Tarancón', 'San Clemente', 'Motilla del Palancar', 'Las Pedroñeras'],
  '17': ['Girona', 'Figueres', 'Blanes', 'Lloret de Mar', 'Salt', 'Olot', 'Banyoles'],
  '18': ['Granada', 'Motril', 'Almuñécar', 'Loja', 'Armilla', 'Maracena', 'Baza', 'Guadix'],
  '19': ['Guadalajara', 'Azuqueca de Henares', 'Sigüenza', 'Molina de Aragón', 'Alovera'],
  '20': ['Donostia-San Sebastián', 'Irun', 'Errenteria', 'Eibar', 'Zarautz', 'Tolosa', 'Arrasate'],
  '21': ['Huelva', 'Almonte', 'Lepe', 'Isla Cristina', 'Moguer', 'Punta Umbría'],
  '22': ['Huesca', 'Monzón', 'Barbastro', 'Fraga', 'Jaca', 'Sabiñánigo'],
  '23': ['Jaén', 'Linares', 'Úbeda', 'Baeza', 'Mengíbar', 'Martos', 'Alcalá la Real'],
  '24': ['León', 'Ponferrada', 'San Andrés del Rabanedo', 'Astorga', 'La Bañeza', 'Villaquilambre'],
  '25': ['Lleida', 'La Seu d\'Urgell', 'Mollerussa', 'Tàrrega', 'Balaguer', 'Cervera'],
  '26': ['Logroño', 'Calahorra', 'Arnedo', 'Haro', 'Alfaro', 'Nájera'],
  '27': ['Lugo', 'Monforte de Lemos', 'Vilalba', 'Sarria', 'Ribadeo', 'Foz'],
  '28': ['Madrid', 'Móstoles', 'Alcalá de Henares', 'Fuenlabrada', 'Leganés', 'Getafe', 'Alcorcón', 'Torrejón de Ardoz', 'Parla', 'Las Rozas'],
  '29': ['Málaga', 'Marbella', 'Fuengirola', 'Vélez-Málaga', 'Torremolinos', 'Benalmádena', 'Estepona', 'Antequera'],
  '30': ['Murcia', 'Cartagena', 'Lorca', 'Yecla', 'Molina de Segura', 'Cieza', 'Águilas'],
  '31': ['Pamplona', 'Tudela', 'Barañáin', 'Estella-Lizarra', 'Zizur Mayor', 'Noáin'],
  '32': ['Ourense', 'Verín', 'O Barco de Valdeorras', 'Celanova', 'Allariz', 'A Rúa'],
  '33': ['Oviedo', 'Gijón', 'Avilés', 'Siero', 'Langreo', 'Mieres', 'Llanera'],
  '34': ['Palencia', 'Aguilar de Campoo', 'Guardo', 'Venta de Baños', 'Saldaña'],
  '35': ['Las Palmas de Gran Canaria', 'Telde', 'Santa Lucía de Tirajana', 'San Bartolomé de Tirajana', 'Arrecife', 'Puerto del Rosario'],
  '36': ['Pontevedra', 'Vigo', 'Marín', 'Redondela', 'Cangas', 'Lalín', 'Vilagarcía de Arousa'],
  '37': ['Salamanca', 'Bejar', 'Santa Marta de Tormes', 'Ciudad Rodrigo', 'Peñaranda de Bracamonte'],
  '38': ['Santa Cruz de Tenerife', 'San Cristóbal de La Laguna', 'Arona', 'Los Realejos', 'La Orotava', 'Puerto de la Cruz'],
  '39': ['Santander', 'Torrelavega', 'Camargo', 'Castro Urdiales', 'Piélagos', 'Laredo'],
  '40': ['Segovia', 'Cuéllar', 'El Espinar', 'La Granja de San Ildefonso', 'Cantalejo'],
  '41': ['Sevilla', 'Dos Hermanas', 'Alcalá de Guadaíra', 'Utrera', 'Mairena del Aljarafe', 'Écija', 'Camas', 'San Juan de Aznalfarache'],
  '42': ['Soria', 'Almazán', 'Burgo de Osma', 'Ólvega', 'Ágreda'],
  '43': ['Tarragona', 'Reus', 'Tortosa', 'Amposta', 'Valls', 'Cambrils', 'Vila-seca', 'Calafell'],
  '44': ['Teruel', 'Alcañiz', 'Andorra', 'Cella', 'Calanda', 'Utrillas'],
  '45': ['Toledo', 'Talavera de la Reina', 'Illescas', 'Seseña', 'Ocaña', 'Torrijos'],
  '46': ['Valencia', 'Gandía', 'Torrent', 'Sagunto', 'Paterna', 'Mislata', 'Alzira', 'Burjassot', 'Aldaia'],
  '47': ['Valladolid', 'Laguna de Duero', 'Medina del Campo', 'Arroyo de la Encomienda', 'Tudela de Duero'],
  '48': ['Bilbao', 'Barakaldo', 'Getxo', 'Portugalete', 'Santurtzi', 'Basauri', 'Leioa', 'Durango', 'Gernika-Lumo'],
  '49': ['Zamora', 'Benavente', 'Toro', 'Morales del Vino', 'Villalpando'],
  '50': ['Zaragoza', 'Calatayud', 'Ejea de los Caballeros', 'Utebo', 'Zaragoza', 'Tarazona', 'Caspe'],
  '51': ['Ceuta'],
  '52': ['Melilla']
}

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
  'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'reprehenderit', 'voluptate', 'velit',
  'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
  'est', 'laborum', 'fusce', 'dapibus', 'tellus', 'ac', 'cursus', 'commodo', 'tortor', 'mauris',
  'condimentum', 'nibh', 'ut', 'fermentum', 'massa', 'justo', 'sit', 'amet', 'risus', 'nullam',
  'dictum', 'felis', 'eu', 'pede', 'mollis', 'pretium', 'integer', 'tincidunt', 'cras', 'dapibus',
  'vivamus', 'elementum', 'semper', 'nisi', 'aenean', 'vulputate', 'eleifend', 'tellus', 'auctor', 'tristique'
]

const NOMBRES = [
  'Abraham','Adrián','Aitor','Alejandro','Alfonso','Álvaro','Andrés','Ángel','Antonio',
  'Carlos','César','Cristian','Daniel','David','Diego','Eduardo','Emilio','Enrique',
  'Fernando','Francisco','Gabriel','Gonzalo','Guillermo','Gustavo','Héctor','Hugo',
  'Ignacio','Iván','Javier','Jorge','José','Juan','Julio','Lorenzo','Lucas','Luis',
  'Manuel','Marco','Marcos','Mario','Martín','Mateo','Miguel','Nicolás','Óscar','Pablo',
  'Pedro','Rafael','Ramón','Raúl','Ricardo','Roberto','Rodrigo','Rubén','Salvador',
  'Samuel','Santiago','Sergio','Simón','Tomás','Vicente','Víctor',
  'María','Carmen','Ana','Isabel','Elena','Marta','Lucia','Sofia','Ines','Julia',
  'Sara','Paula','Nadia','Claudia','Laura','Natalia','Rosa','Silvia','Monica','Andrea',
  'Beatriz','Cristina','Diana','Esther','Irene','Jessica','Lourdes','Margarita',
  'Mercedes','Miriam','Noelia','Olga','Pilar','Raquel','Sandra','Sonia','Teresa','Verónica'
]

const APELLIDOS = [
  'García','González','Rodríguez','Fernández','López','Martínez','Sánchez','Pérez','Gómez','Martín',
  'Jiménez','Hernández','Díaz','Moreno','Romero','Álvarez','Torres','Ruiz','Rubio','Serrano',
  'Ortega','Castro','Navarro','Guerrero','Mendoza','Vargas','Herrera','Medina','Aguilar','Cortés',
  'Flores','Ramos','Vega','Cruz','Morales','Gutierrez','Delgado','Arias','Molina','Gil',
  'Marín','Lara','Rivera','Santos','Santiago','Escobar','Rojas','Correa','León','Maldonado',
  'Silva','Soto','Palma','Aguirre','Ferrer','Otero','Rivero','Blanco','Calvo','Domínguez',
  'Estévez','Gálvez','Garrido','Herrero','Ibáñez','Leiva','Luna','Miranda','Montoya','Naranjo',
  'Navas','Núñez','Peña','Peralta','Prieto','Quintana','Rosales','Salas','Salazar','Salinas',
  'Sancho','Sandoval','Santana','Segura','Serra','Sierra','Suárez','Toledo','Valencia','Velasco',
  'Vera','Villa','Villanueva','Zambrano','Zapata','Zúñiga'
]

const TIPOS_VIA = ['Calle', 'Avenida', 'Plaza', 'Paseo', 'Callejón', 'Ronda', 'Glorieta', 'Travesía']
const NOMBRES_VIA = [
  'Mayor', 'Real', 'Sol', 'Gran Vía', 'Alcalá', 'Serrano', 'Castellana', 'Princesa',
  'Constitución', 'España', 'Libertad', 'Iglesia', 'Fuente', 'Puerta', 'Palacio',
  'Cervantes', 'Lope de Vega', 'Velázquez', 'Goya', 'Dalí', 'Picasso', 'Lorca',
  'Cordoba', 'Sevilla', 'Madrid', 'Barcelona', 'Valencia', 'Andalucía', 'Cataluña',
  'Roble', 'Olmo', 'Pino', 'Laurel', 'Jazmín', 'Rosal', 'Clavel', 'Azucena',
  'Sol', 'Luna', 'Estrella', 'Río', 'Mar', 'Montaña', 'Valle', 'Huerta'
]

export function generateLoremIpsum() {
  const len = rand(3, 12)
  return Array.from({ length: len }, () => pick(LOREM_WORDS)).join(' ')
}

export function generateNombre() {
  return pick(NOMBRES)
}

export function generateApellidos() {
  return `${pick(APELLIDOS)} ${pick(APELLIDOS)}`
}

export function generateDireccion() {
  const via = pick(TIPOS_VIA)
  const nombre = pick(NOMBRES_VIA)
  const numero = rand(1, 999)
  return `${via} ${nombre}, ${numero}`
}

export function generateProvincia() {
  return pick(PROVINCIAS).name
}

export function generateCiudad(provinciaCode) {
  if (provinciaCode && CIUDADES_POR_PROVINCIA[provinciaCode]) {
    return pick(CIUDADES_POR_PROVINCIA[provinciaCode])
  }
  const all = Object.values(CIUDADES_POR_PROVINCIA).flat()
  return pick(all)
}

export function generateCP(provinciaCode) {
  const code = provinciaCode || String(rand(1, 52)).padStart(2, '0')
  return code + String(rand(0, 999)).padStart(3, '0')
}

export function generateFecha(startStr, endStr) {
  const start = startStr ? new Date(startStr) : new Date(2000, 0, 1)
  const end = endStr ? new Date(endStr) : new Date()
  const diff = end.getTime() - start.getTime()
  const randomDate = new Date(start.getTime() + Math.random() * diff)
  return randomDate.toISOString().split('T')[0]
}

export function generateBIC() {
  const prefixes = ['BBVA', 'CAIX', 'SANT', 'BSCH', 'POPU', 'ING', 'BANK', 'CAGR', 'UNI', 'SAB']
  const bank = pick(prefixes)
  const loc = String.fromCharCode(rand(65, 90)) + String.fromCharCode(rand(65, 90))
  const br = String(rand(0, 999)).padStart(3, '0')
  return `${bank}ES${loc}${br}`
}

export const COLUMN_TYPES = [
  { value: 'vacio', label: 'Vacío' },
  { value: 'conjunto', label: 'Conjunto limitado' },
  { value: 'uuid', label: 'UUID' },
  { value: 'row_num', label: 'Número de fila' },
  { value: 'row_num_pad3', label: 'Nº fila (3 dígitos)' },
  { value: 'row_num_pad4', label: 'Nº fila (4 dígitos)' },
  { value: 'row_num_pad5', label: 'Nº fila (5 dígitos)' },
  { value: 'lorem_ipsum', label: 'Lorem ipsum' },
  { value: 'dni', label: 'DNI' },
  { value: 'iban', label: 'IBAN' },
  { value: 'nombre', label: 'Nombre' },
  { value: 'apellidos', label: 'Apellidos' },
  { value: 'cp', label: 'Código Postal' },
  { value: 'direccion', label: 'Dirección' },
  { value: 'ciudad', label: 'Ciudad' },
  { value: 'provincia', label: 'Provincia' },
  { value: 'bic', label: 'BIC/SWIFT' },
  { value: 'fecha', label: 'Fecha' }
]

export function generateValue(type, rowIndex, config) {
  switch (type) {
    case 'vacio': return ''
    case 'conjunto': return pick(config?.valores || [''])
    case 'uuid': return crypto.randomUUID()
    case 'row_num': return String(rowIndex)
    case 'row_num_pad3': return String(rowIndex).padStart(3, '0')
    case 'row_num_pad4': return String(rowIndex).padStart(4, '0')
    case 'row_num_pad5': return String(rowIndex).padStart(5, '0')
    case 'lorem_ipsum': return generateLoremIpsum()
    case 'dni': return generateRandomDNI()
    case 'iban': return generateIBAN('ES')
    case 'nombre': return generateNombre()
    case 'apellidos': return generateApellidos()
    case 'cp': return generateCP(config?.provincia)
    case 'direccion': return generateDireccion()
    case 'ciudad': return generateCiudad(config?.provincia)
    case 'provincia': return generateProvincia()
    case 'bic': return generateBIC()
    case 'fecha': return generateFecha(config?.fechaInicio, config?.fechaFin)
    default: return ''
  }
}

export function buildCSV(rows, separator, columns) {
  const encabezado = columns.map(c => c.name).join(separator)
  const lineas = []
  for (let i = 1; i <= rows; i++) {
    const valores = columns.map(c => generateValue(c.type, i, c.config))
    lineas.push(valores.join(separator))
  }
  return encabezado + '\n' + lineas.join('\n')
}
