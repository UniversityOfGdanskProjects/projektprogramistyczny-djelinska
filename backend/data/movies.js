const moviesData = [
	{
		title: 'Incepcja',
		description:
			'Akcja toczy się w świecie, gdzie ludzie mogą wchodzić do snów innych ludzi.',
		genre: 'Sci-Fi',
		release_year: 2010,
		duration_time: 2.5,
		director: 'Christopher Nolan',
		actors: [
			{
				name: 'Leonardo DiCaprio',
				role: 'Cobb',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5Brc5dLifH3UInk3wUaCuGXpCqy.jpg',
			},
			{
				name: 'Joseph Gordon-Levitt',
				role: 'Arthur',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/z2FA8js799xqtfiFjBTicFYdfk.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/10_06/2010/1375666/l_1375666_07030c72.jpg',
		video_url: 'https://www.youtube.com/embed/8hP9D6kZseM?si=FB_zkUXJvHnBulnj',
	},
	{
		title: 'Zielona mila',
		description:
			'Historia więźnia, który ma zdolność uzdrawiania innych ludzi.',
		genre: 'Dramat',
		release_year: 1999,
		duration_time: 3,
		director: 'Frank Darabont',
		actors: [
			{
				name: 'Tom Hanks',
				role: 'Paul Edgecomb',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg',
			},
			{
				name: 'Michael Clarke Duncan',
				role: 'John Coffey',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3RX8OBqt3gbvFwKYZqiom4O3Ta6.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/05_07/1999/0120689/l_34970_0120689_e3f4a87d.jpg',
		video_url: 'https://www.youtube.com/embed/Bg7epsq0OIQ?si=7D_oldevfxzrXKGX',
	},
	{
		title: 'Nietykalni',
		description:
			'Bogaty arystokrata zatrudnia opiekuna do pomocy mu w codziennym życiu.',
		genre: 'Dramat',
		release_year: 2011,
		duration_time: 1.5,
		director: 'Olivier Nakache, Éric Toledano',
		actors: [
			{
				name: 'François Cluzet',
				role: 'Philippe',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/f6PO7Lkrem1N4UmklxHro2k6Jto.jpg',
			},
			{
				name: 'Omar Sy',
				role: 'Driss',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/laNZay6AfEzvEvY1NUH9UFiSD0a.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/12_08/2011/1675434/l_1675434_234f54d4.jpg',
		video_url: 'https://www.youtube.com/embed/XglJSKew0QY?si=dnnG5UvV1AY9u0iE',
	},
	{
		title: 'Więzień labiryntu',
		description:
			'Młody chłopak stara się odkryć tajemnice labiryntu, aby uratować siebie i swoich przyjaciół.',
		genre: 'Akcja',
		release_year: 2014,
		duration_time: 2,
		director: 'Wes Ball',
		actors: [
			{
				name: "Dylan O'Brien",
				role: 'Thomas',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/7jaI9lweFXON62ykSgF2tIgoRCj.jpg',
			},
			{
				name: 'Kaya Scodelario',
				role: 'Teresa',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/oKsGrXKGrcVoQJQ6pbjZDPOQJcM.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/14_08/2014/1790864/l_1790864_fe41cf34.jpg',
		video_url: 'https://www.youtube.com/embed/ftSkByPS3ik?si=ca-4jtTXjUQ637VH',
	},
	{
		title: 'Skazani na Shawshank',
		description:
			'Bankier zostaje niesłusznie skazany na dożywocie w więzieniu Shawshank.',
		genre: 'Dramat',
		release_year: 1994,
		duration_time: 2.5,
		director: 'Frank Darabont',
		actors: [
			{
				name: 'Tim Robbins',
				role: 'Andy Dufresne',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/A4fHNLX73EQs78f2G6ObfKZnvp4.jpg',
			},
			{
				name: 'Morgan Freeman',
				role: "Ellis Boyd 'Red' Redding",
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jPsLqiYGSofU4s6BjrxnefMfabb.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/05_03/1994/0111161/l_8494_0111161_3bb8e662.jpg',
		video_url: 'https://www.youtube.com/embed/P9mwtI82k6E?si=BXCVyGEusLZzOBNT',
	},
	{
		title: 'Matrix',
		description:
			'Haker odkrywa prawdziwą naturę rzeczywistości i staje się bohaterem wojny maszyn.',
		genre: 'Sci-Fi',
		release_year: 1999,
		duration_time: 2.5,
		director: 'The Wachowskis',
		actors: [
			{
				name: 'Keanu Reeves',
				role: 'Neo',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg',
			},
			{
				name: 'Carrie-Anne Moss',
				role: 'Trinity',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/xD4jTA3KmVp5Rq3aHcymL9DUGjD.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/06_01/1999/0133093/l_77607_0133093_ab8bc972.jpg',
		video_url: 'https://www.youtube.com/embed/m8e-FF8MsqU?si=BPSNmyunZXT6CfND',
	},
	{
		title: 'Forrest Gump',
		description:
			'Historia życia Forresta Gumpa, który przez przypadek uczestniczy w wielu kluczowych wydarzeniach historycznych.',
		genre: 'Dramat',
		release_year: 1994,
		duration_time: 2,
		director: 'Robert Zemeckis',
		actors: [
			{
				name: 'Tom Hanks',
				role: 'Forrest Gump',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg',
			},
			{
				name: 'Robin Wright',
				role: 'Jenny Curran',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3IvlZd2PpT3Tuxy8lr6ymWLyoNU.jpg',
			},
			{
				name: 'Haley Joel Osment',
				role: 'Cole Sear',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/2rnMTQB9Q3vLtmRyyUaenVwSgfY.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/12_04/1994/109830/l_109830_58524cd6.jpg',
		video_url: 'https://www.youtube.com/embed/XHhAG-YLdk8?si=xIOVhEGn-rvwyLJS',
	},
	{
		title: 'Ojciec chrzestny',
		description:
			'Rodzina mafijna stara się utrzymać swoją władzę po zmianach politycznych.',
		genre: 'Dramat',
		release_year: 1972,
		duration_time: 2.5,
		director: 'Francis Ford Coppola',
		actors: [
			{
				name: 'Marlon Brando',
				role: 'Vito Corleone',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg',
			},
			{
				name: 'Al Pacino',
				role: 'Michael Corleone',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cCECRgy3E1e1jE6y5xtSsThnLid.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/22_07/1972/68646/l_68646_8c811dec.jpg',
		video_url: 'https://www.youtube.com/embed/UaVTIH8mujA?si=32fT7WlJGihfhMpd',
	},
	{
		title: 'Szeregowiec Ryan',
		description:
			'Podczas II wojny światowej oddział szeregowiec Ryan zostaje wysłany, aby go uratować.',
		genre: 'Dramat',
		release_year: 1998,
		duration_time: 2.5,
		director: 'Steven Spielberg',
		actors: [
			{
				name: 'Tom Hanks',
				role: 'Kapitan John Miller',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg',
			},
			{
				name: 'Matt Damon',
				role: 'Szeregowiec James Francis Ryan',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/At3JgvaNeEN4Z4ESKlhhes85Xo3.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/07_10/1998/120815/l_120815_e70398d8.jpg',
		video_url: 'https://www.youtube.com/embed/9CiW_DgxCnQ?si=cMTxb6WGLLbuOC3z',
	},
	{
		title: 'Pulp Fiction',
		description:
			'Historie różnych postaci splatają się w świecie przestępczym Los Angeles.',
		genre: 'Kryminał',
		release_year: 1994,
		duration_time: 2.5,
		director: 'Quentin Tarantino',
		actors: [
			{
				name: 'John Travolta',
				role: 'Vincent Vega',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ap8eEYfBKTLixmVVpRlq4NslDD5.jpg',
			},
			{
				name: 'Samuel L. Jackson',
				role: 'Jules Winnfield',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/nCJJ3NVksYNxIzEHcyC1XziwPVj.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/07_10/1994/110912/l_110912_55345443.jpg',
		video_url: 'https://www.youtube.com/embed/tGpTpVyI_OQ?si=wJtKZZQ87qK1Q3uP',
	},
	{
		title: 'Interstellar',
		description:
			'Grupa astronautów wyrusza w podróż międzygwiezdną, aby znaleźć nowy dom dla ludzkości.',
		genre: 'Sci-Fi',
		release_year: 2014,
		duration_time: 2.5,
		director: 'Christopher Nolan',
		actors: [
			{
				name: 'Matthew McConaughey',
				role: 'Cooper',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/e9ZHRY5toiBZCIPEEyvOG9A8ers.jpg',
			},
			{
				name: 'Anne Hathaway',
				role: 'Amelia Brand',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/15_03/2014/816692/l_816692_284eb9d5.jpg',
		video_url: 'https://www.youtube.com/embed/zSWdZVtXT7E?si=zASvBLefG22520Vb',
	},
	{
		title: 'Siedem',
		description:
			'Detektyw i nowy partner tropią seryjnego mordercę, który działa według siedmiu grzechów głównych.',
		genre: 'Thriller',
		release_year: 1995,
		duration_time: 2,
		director: 'David Fincher',
		actors: [
			{
				name: 'Brad Pitt',
				role: 'Detektyw David Mills',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cckcYc2v0yh1tc9QjRelptcOBko.jpg',
			},
			{
				name: 'Morgan Freeman',
				role: 'Detektyw William Somerset',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jPsLqiYGSofU4s6BjrxnefMfabb.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/06_05/1995/0114369/l_115148_0114369_f2af901e.jpg',
		video_url: 'https://www.youtube.com/embed/znmZoVkCjpI?si=kHEChMavXnRmas0r',
	},
	{
		title: 'Django',
		description:
			'Django, uwolniony niewolnik, staje się łowcą nagród, aby uwolnić swoją żonę od okrutnego plantatora.',
		genre: 'Western',
		release_year: 2012,
		duration_time: 2.5,
		director: 'Quentin Tarantino',
		actors: [
			{
				name: 'Jamie Foxx',
				role: 'Django',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hPwCMEq6jLAidsXAX5BfoYgIfg2.jpg',
			},
			{
				name: 'Christoph Waltz',
				role: 'Doktor King Schultz',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/2Hhztd4mUEV9Y25rfkXDwzL9QI9.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/21_02/2012/1853728/l_1853728_7fb18a9f.jpg',
		video_url: 'https://www.youtube.com/embed/0fUCuvNlOCg?si=pOc-7EGQH8IKOKtk',
	},
	{
		title: 'Whiplash',
		description:
			'Młody perkusista próbuje osiągnąć doskonałość muzyczną pod nadzorem wymagającego nauczyciela.',
		genre: 'Dramat',
		release_year: 2014,
		duration_time: 1.5,
		director: 'Damien Chazelle',
		actors: [
			{
				name: 'Miles Teller',
				role: 'Andrew Neiman',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/cg3LW0xX6RKr8dmescxq1bepcb5.jpg',
			},
			{
				name: 'J.K. Simmons',
				role: 'Terence Fletcher',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ScmKoJ9eiSUOthAt1PDNLi8Fkw.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/15_04/2014/2582802/l_2582802_e45869e6.jpg',
		video_url: 'https://www.youtube.com/embed/7d_jQycdQGo?si=IZrp2_JtO1AI8BDC',
	},
	{
		title: 'Szósty zmysł',
		description:
			'Psycholog dziecięcy próbuje pomóc chłopcu, który twierdzi, że widzi zmarłych ludzi.',
		genre: 'Dramat',
		release_year: 1999,
		duration_time: 1.5,
		director: 'M. Night Shyamalan',
		actors: [
			{
				name: 'Bruce Willis',
				role: 'Dr. Malcolm Crowe',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/caX3KtMU42EP3VLRFFBwqIIrch5.jpg',
			},
			{
				name: 'Haley Joel Osment',
				role: 'Cole Sear',
				image:
					'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/2rnMTQB9Q3vLtmRyyUaenVwSgfY.jpg',
			},
		],
		poster_image:
			'https://posters.movieposterdb.com/07_12/1999/167404/l_167404_e2f22ee3.jpg',
		video_url: 'https://youtu.be/3-ZP95NF_Wk?si=g9ZUxdwYFsRRmQjb',
	},
];

module.exports = moviesData;
