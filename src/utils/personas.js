import { generateIBAN } from './iban.js'

const spanishNames = {
  nombres: [
    'Abraham','Adrián','Aitor','Alejandro','Alfonso','Alonso','Álvaro','Andrés','Ángel','Antonio',
    'Carlos','César','Cristian','Daniel','David','Diego','Eduardo','Emilio','Enrique','Ernesto',
    'Félix','Fernando','Francisco','Gabriel','Germán','Gonzalo','Guillermo','Gustavo',
    'Héctor','Hugo','Ignacio','Iván','Javier','Joaquín','Jorge','José','Juan','Juan José','Julio',
    'Leonardo','Lorenzo','Lucas','Luis','Luis Alberto','Luis Miguel',
    'Manuel','Marco','Marcos','Mario','Martín','Mateo','Matías','Maximiliano','Miguel','Miguel Ángel',
    'Nicolás','Óscar','Pablo','Pancho','Pascual','Patricio','Pedro','Pedro Pablo',
    'Rafael','Ramón','Raúl','Ricardo','Roberto','Rodrigo','Rubén',
    'Salvador','Samuel','Santiago','Sergio','Simón','Tomás',
    'Vicente','Víctor','Víctor Manuel',
    'María','Carmen','Ana','Isabel','Elena','Marta','Lucia','Sofia','Ines','Julia',
    'Sara','Paula','Nadia','Claudia','Laura','Natalia','Rosa','Silvia','Monica','Andrea',
    'Angela','Beatriz','Cristina','Diana','Esther','Gloria','Irene','Jessica','Lourdes','Lucía',
    'Margarita','María Carmen','María José','María Pilar','Mercedes','Miriam','Noelia','Olga','Pilar','Raquel',
    'Reyes','Sandra','Sonia','Teresa','Vanessa','Verónica','Virginia','Yolanda'
  ],
  apellidos: [
    'García','González','Rodríguez','Fernández','López','Martínez','Sánchez','Pérez','Gómez','Martín',
    'Jiménez','Hernández','Díaz','Moreno','Romero','Álvarez','Torres','Ruiz','Rubio','Serrano',
    'Ortega','Castro','Navarro','Guerrero','Mendoza','Vargas','Herrera','Medina','Aguilar','Cortés',
    'Flores','Ramos','Vega','Cruz','Morales','Gutierrez','Ojeda','Carrillo','Estrada','Reyes',
    'Campos','Delgado','Arias','Molina','Gil','Marín','Lara','Rivera','Santos','Santiago',
    'Escobar','Alfaro','Rojas','Correa','León','Maldonado','Silva','Yáñez','Mejías','Soto',
    'Palma','Aguirre','Vigil','Ferrer','Otero','Rivero','Alemán','Blanco','Calvo','Cantos',
    'Cárdena','Domínguez','Dueñas','Escudero','Estévez','Flórez','Gaitán','Gálvez','Gamboa','Garay',
    'Garrido','Gonzaga','Granados','Herrero','Ibáñez','Jaramillo','Lazo','Leiva','Luna','Mansilla',
    'Mármol','Mejía','Miranda','Montoya','Moraga','Naranjo','Navas','Núñez','Oliva','Padilla',
    'Palomo','Peña','Peralta','Pineda','Pinto','Prieto','Quintana','Quintanilla','Roca','Rodrigáñez',
    'Rosales','Salas','Salazar','Salinas','Sampedro','Sanabria','Sancho','Sandoval','Santana','Santoyo',
    'Segovia','Segura','Serra','Sierra','Solís','Solsona','Sorto','Suárez','Talavera','Toledo',
    'Troncoso','Uribe','Urquiza','Valdez','Valdivia','Valencia','Valenzuela','Valladares','Varela','Vargas',
    'Varela','Velasco','Velásquez','Venegas','Vera','Verdugo','Villa','Villagrana','Villalobos','Villanueva',
    'Villatoro','Yo','Zambrano','Zapata','Zúñiga'
  ],
  bancos: [
    '0049','0050','0061','0065','0087','0094','0112','0114','0118','0122','0123','0124','0136','0142','0143',
    '0144','0147','0149','0154','0159','0177','0182','0184','0188','0198','0202','0204','0208','0214',
    '0219','0227','0229','0231','0237','0240','0242','0244','0246','0247','0249','0251','0253','0256',
    '0258','0271','0272','0274','0276','0277','0279','0284','0287','0289','0290','0293','0295','0297',
    '0299','0300','0301','0308','0310','0311','0316','0318','0319','0322','0325','0327','0329','0331',
    '0332','0333','0334','0335','0336','0337','0338','0339','0340','0341','0342','0343','0344','0345'
  ]
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateValidSpanishIBAN() {
  return generateIBAN('ES')
}

function generateBIC() {
  const banks = ['BBVA', 'CAIX', 'SANT', 'BSCH', 'POPU', 'ING']
  const bank = randomElement(banks)
  const loc = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const br = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${bank}ES${loc}${br}`
}

export function generatePerson() {
  const nombre = randomElement(spanishNames.nombres)
  const apellido1 = randomElement(spanishNames.apellidos)
  const apellido2 = randomElement(spanishNames.apellidos)
  const dni = generateRandomDNI()
  const iban = generateValidSpanishIBAN()
  const bic = generateBIC()
  
  return {
    nombre: `${nombre} ${apellido1} ${apellido2}`,
    dni,
    iban,
    bic
  }
}

function generateRandomDNI() {
  const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
  const letter = letters[parseInt(number, 10) % 23]
  return `${number}${letter}`
}

export function generateMultiple(count) {
  const personas = []
  for (let i = 0; i < count; i++) {
    personas.push(generatePerson())
  }
  return personas
}