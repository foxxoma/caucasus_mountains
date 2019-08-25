let dataMountains =
	[{
		name: "Fethuz",
		description: "The mountain range of Fethus stretches from east to west.The height of the mountain reaches 1745 m Located 10 kilometers sou44.514750799999995th of the city of Vladikavkaz. It refers to the large peaks of the pasture range. The translation of the name, perhaps, means - bow, because of its long, curved look. Several routes lead to the summit.",
		lat: 42.9382966,
		lng: 44.599455
	}, {
		name: "Arauhoh",
		description: "Arauhoh - mountain peak in North Ossetia, in the system of the Rocky ridge. The height of the mountain reaches 2680 m. The name is translated from the Ossetian language as 'sonorous mountain.'",
		lat: 42.8815101,
		lng: 44.5888324
	}, {
		name: "Stolovaya",
		description: "Madyhoh Mountain in Russia, in the North Caucasus. It is located mainly in the territory of the Dzheirahsky region of Ingushetia, along the ridge of the mountain passes the border with the Prigorodny district of North Ossetia. The height of the mountain is 3003 m. It is a table mountain. Table Mountain is depicted on the state emblem of the Republic of Ingushetia. The peak is visible from the capital of Ingushetia - Magas and North Ossetia - the city of Vladikavkaz and is also depicted on its coat of arms.",
		lat: 42.8708924,
		lng: 44.6966123

	}, {
		name: "Tbauhoh",
		description: "The height of the mountain reaches 2980 m.This mountain is part of the Rocky Ridge and the ridge itself, almost all along the length of it is cut by very deep gorges into separate parts. Her neighbors on the ridge are Kariuhoh in the west and Chizdinhokh in the east.",
		lat: 42.8668879,
		lng: 44.3940592
	}, {
		name: "Heah",
		description: "The height of the mountain reaches 2770 m. Russia, Republic of North Ossetia - Alania, Vladikavkaz urban district",
		lat: 42.85203,
		lng: 44.56451
	}, {
		name: "Kariuhokh",
		description: "The height of the mountain reaches 3439  m. Russia, Republic of North Ossetia-Alania, Alagirsky District",
		lat: 42.87157,
		lng: 44.23192
	}, {
		name: "Oisehoh",
		description: "The height of the mountain reaches 3529 m. Russia, Republic of North Ossetia-Alania, Iraf District",
		lat: 43.01247,
		lng: 43.67874
	}, {
		name: "Kazbek",
		description: "The height of the mountain reaches 5033 m. Georgia, Mtskheta-Mtianeti region, Kazbegi region",
		lat: 42.69706,
		lng: 44.51812
	}, {
		name: "Jimaraihoh",
		description: "The height of the mountain reaches 4780 m. Georgia, Mtskheta-Mtianeti region, Kazbegi region",
		lat: 42.71935,
		lng: 44.41613
	}, {
		name: "Kaijans",
		description: "The height of the mountain reaches 3 980 m. Georgia, Mtskheta-Mtianeti region, Kazbegi region",
		lat: 42.76631,
		lng: 44.55272
	}, {
		name: "Kaijans Little",
		description: "The height of the mountain reaches 3590 m. Russia, Republic of North Ossetia - Alania, Vladikavkaz urban district",
		lat: 42.77982,
		lng: 44.55917
	}, {
		name: "Kaijany South",
		description: "The height of the mountain reaches 3959 m. Georgia, Mtskheta-Mtianeti region, Kazbegi region",
		lat: 42.75837,
		lng: 44.54539
	}, {
		name: "Shauhoh",
		description: "The height of the mountain reaches 4636 m. Russia, Republic of North Ossetia-Alania, Prigorodny District",
		lat: 42.7419,
		lng: 44.40508
	}, {
		name: "Chizdzhityhoh",
		description: "The height of the mountain reaches 4636 m. Russia, Republic of North Ossetia-Alania",
		lat: 42.859190,
		lng: 44.479466
	}]

let descriptionMountainEl = {
	contentInDescription: document.getElementById('description_textrea'),
	nameInDescription: document.getElementById('description_name_mountain'),
	name: document.getElementById('name_mountain'),
	icon: document.getElementById("description_menu"),
	description: document.getElementById("description")
}

let settingEl = {
	body: document.getElementById('window'),
	canvas: document.getElementById('range_canvas_angle'),
	icon: document.getElementById('settings_icon'),
	interfase: document.getElementById('settings_content'),
	range: {
		fontSize: document.getElementById('range_fontSize'),
		angle: document.getElementById('range_angle')
	}
}
let MyPosition = {};