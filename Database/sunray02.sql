-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2024 at 05:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sunray02`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`user_id`, `vacation_id`) VALUES
(2, 5),
(2, 6),
(2, 8),
(10, 5),
(30, 22),
(30, 16),
(30, 14),
(30, 23),
(30, 11),
(30, 2),
(31, 39),
(31, 24),
(31, 6),
(31, 9),
(31, 12),
(31, 25),
(28, 5),
(28, 29),
(28, 17),
(28, 25),
(28, 24),
(28, 32),
(26, 22),
(26, 16),
(26, 11),
(26, 14),
(26, 20),
(26, 31),
(26, 32),
(26, 12);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(25) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`) VALUES
(2, 'haha', 'hoho', 'testadmin@one.com', '12345678', 1),
(9, 'mike', 'mike', 'mike@gmail.com', '12345', 1),
(10, 'omri', 'jawames', 'omri.jawames@gmail.com', '12345', 1),
(13, 'hahaaa', 'hahah', 'hahah@gmail.com', '12345', 1),
(24, 'sasa', 'sasa', 'sasa@yahoo.com', '123456', 1),
(25, 'roro', 'roro', 'roro@gmail.com', '123456', 1),
(26, 'ddd', 'ddd', 'ddd@gmail.com', '123456', 1),
(27, 'fff', 'fff', 'fff@gmail.com', '123456', 1),
(28, 'ttt', 'ttt', 'ttt@gmail.com', '123456', 1),
(29, 'hhh', 'hhh', 'hhh@gmail.com', '123456', 1),
(30, 'ggg', 'ggg', 'ggg@gmail.com', '123456', 1),
(31, 'ccc', 'ccc', 'ccc@gmail.com', '123456', 1),
(32, 'nana', 'nana', 'nana@yahoo.com', '12345', 1),
(33, 'fofo', 'fofo', 'fofo@gmail.com', '12345', 1),
(34, 'qqq', 'qqq', 'qqq@gmail.com', '12345', 1),
(35, 'vvv', 'vvv', 'vvv@gmail.com', '12345', 1),
(36, 'eee', 'eee', 'eee@gmail.com', '12345', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `destination` varchar(200) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image`) VALUES
(2, 'Rome - Italy', 'Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome Capital, and a special comune (municipality) named Comune di Roma Capitale. With 2,860,009 residents in 1,285 km2 (496.1 sq mi),[2] Rome is the country\'s most populated comune and the third most populous city in the European Union by population within city limits. The Metropolitan City of Rome, with a population of 4,355,725 residents, is the most populous metropolitan city in Italy.[3] Its metropolitan area is the third-most populous within Italy.', '2024-05-18', '2024-05-25', 940, 'Roma.jpg'),
(5, 'PARIS - France.', 'Paris[a] is the capital and largest city of France. With an official estimated population of 2,102,650 residents as of 1 January 2023[2] in an area of more than 105 km2 (41 sq mi),[5] Paris is the fourth-largest city in the European Union and the 30th most densely populated city in the world in 2022.[6] Since the 17th century, Paris has been one of the world\'s major centres of finance, diplomacy, commerce, culture, fashion, and gastronomy. For its leading role in the arts and sciences, as well as its early and extensive system of street lighting, in the 19th century, it became known as the City of Light.[7]\r\n\r\nThe City of Paris is the centre of the Île-de-France region, or Paris Region, with an official estimated population of 12,271,794 inhabitants on 1 January 2023, or about 19% of the population of France.[2] The Paris Region had a GDP of €765 billion (US$1.064 trillion, PPP)[8] in 2021, the highest in the European Union.[9] According to the Economist Intelligence Unit Worldwide Cost of Living Survey, in 2022, Paris was the city with the ninth-highest cost of living in the world.', '2024-07-01', '2024-07-05', 400, 'Paris.jpeg'),
(6, 'Jerusalem -Israel', 'Jerusalem is a city in the Southern Levant, on a plateau in the Judaean Mountains between the Mediterranean and the Dead Sea. It is one of the oldest cities in the world, and is considered holy to the three major Abrahamic religions—Judaism, Christianity, and Islam. Both the State of Israel and Palestine claim Jerusalem as their capital. Israel maintains its primary governmental institutions there, and Palestine ultimately foresees it as its seat of power. Neither claim is widely recognized internationally.\r\nThroughout its long history, Jerusalem has been destroyed at least twice, besieged 23 times, captured and recaptured 44 times, and attacked 52 times.The part of Jerusalem called the City of David shows first signs of settlement in the 4th millennium BCE, in the shape of encampments of nomadic shepherds.During the Canaanite period (14th century BCE).', '2024-06-19', '2024-06-22', 5000, 'Jerusalem.jpg'),
(8, 'Istanbul -Turkey', 'Istanbul,[a] is the largest city in Turkey, straddling the Bosporus Strait, the boundary between Europe and Asia. It is considered the country\'s economic, cultural and historic capital. The city has a population of over 15 million residents, comprising 19% of the population of Turkey,[4] and is the most populous city in Europe[b] and the world\'s fifteenth-largest city.', '2024-06-11', '2024-06-19', 1580, 'Istanbul.jpeg'),
(9, 'NewYork -USA', 'New York, often called New York City[b] or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world\'s largest natural harbors. The city comprises five boroughs, each of which is coextensive with a respective county. New York is a global center of finance[11] and commerce, culture and technology,[12] entertainment and media, academics and scientific output,[13] and the arts and fashion, and, as home to the headquarters of the United Nations, is an important center for international diplomacy.[14][15][16][17][18] New York City is the center of the world\'s principal metropolitan economy.[19]\r\n\r\nWith an estimated population in 2023 of 8,258,035[5] distributed over 300.46 square miles (778.2 km2),[4] the city is the most densely populated major city in the United States. New York has more than double the population of Los Angeles, the nation\'s second-most populous city.[20] New York is the geographical and demographic center of both the Northeast megalopolis and the New York metropolitan area, the largest metropolitan area in the U.S. by both population and urban area. With more than 20.1 million people in its metropolitan statistical area[21] and 23.5 million in its combined statistical area as of 2020', '2024-06-19', '2024-06-22', 1150, 'new-york-statue-of-liberty.avif'),
(11, 'Milan - Italy', 'is a city in Northern Italy, regional capital of Lombardy, and the second-most-populous city proper in Italy after Rome. The city proper has a population of about 1.4 million,[7] while its metropolitan city has 3.22 million residents.[8] The urban area of Milan is the fourth-most-populous in the EU with 5.27 million inhabitants. According to national sources, the population within the wider Milan metropolitan area (also known as Greater Milan) is estimated between 4.9 million and 7.4 million, making it by far the largest metropolitan area in Italy and one of the largest in the EU.Milan is the economic capital of Italy, one of the economic capitals of Europe and a global financial centre.', '2024-06-13', '2024-06-17', 370, 'Milano.jpg'),
(12, 'Berlin - Germany', 'Berlin[a] is the capital and largest city of Germany, both by area and by population.[11] Its more than 3.85 million inhabitants[12] make it the European Union\'s most populous city, as measured by population within city limits.[13] Simultaneously, the city is one of the states of Germany, and is the third smallest state in the country in terms of area. Berlin is surrounded by the state of Brandenburg, and Brandenburg\'s capital Potsdam is nearby. The urban area of Berlin has a population of over 4.5 million and is therefore the most populous urban area in Germany.[5][14] The Berlin-Brandenburg capital region has around 6.2 million inhabitants and is Germany\'s second-largest metropolitan region after the Rhine-Ruhr region, and the fifth-biggest metropolitan region by GDP in the European Union.', '2024-06-15', '2024-06-25', 5000, 'Berlin.jpg'),
(13, 'Naples - Italy', 'is the regional capital of Campania and the third-largest city of Italy,[3] after Rome and Milan, with a population of 909,048 within the city\'s administrative limits as of 2022.[4] Its province-level municipality is the third-most populous metropolitan city in Italy with a population of 3,115,320 residents,[5] and its metropolitan area stretches beyond the boundaries of the city wall for approximately 30 kilometres (20 miles).', '2024-06-05', '2024-06-12', 1235, 'Napoli.jpg'),
(14, 'Haifa - Israel', 'is the third-largest city in Israel—after Jerusalem and Tel Aviv—with a population of 290,306 in 2022. The city of Haifa forms part of the Haifa metropolitan area, the third-most populous metropolitan area in Israel.[3] It is home to the Baháʼí Faith\'s Baháʼí World Centre, and is a UNESCO World Heritage Site and a destination for Baháʼí pilgrimage.[4]\r\n\r\nBuilt on the slopes of Mount Carmel, the settlement has a history spanning more than 3,000 years. The earliest known settlement in the vicinity was Tell Abu Hawam, a small port city established in the Late Bronze Age (14th century BCE).[5] In the 3rd century CE, Haifa was known as a dye-making center. Over the millennia, the Haifa area has changed hands: being conquered and ruled by the Canaanites, Israelites, Phoenicians, Assyrians, Babylonians, Persians, Hasmoneans, Romans, Byzantines, Arabs, Crusaders, Ottomans, and the British. During the Battle of Haifa in the 1948 Palestine war, most of the city\'s predominantly Arab population fled or were expelled. That year, the city became part of the then-newly-established state of Israel.', '2024-06-12', '2024-06-19', 325, 'Haifa.jpg'),
(15, 'Moscow - Russia', 'Moscow is the capital and largest city of Russia. The city stands on the Moskva River in Central Russia, with a population estimated at over 13 million residents within the city limits,[6] over 18.8 million residents in the urban area,[7] and over 21.5 million residents in its metropolitan area.[14] The city covers an area of 2,511 square kilometers (970 sq mi), while the urban area covers 5,891 square kilometers (2,275 sq mi),[7] and the metropolitan area covers over 26,000 square kilometers (10,000 sq mi).[14] Moscow is among the world\'s largest cities, being the most populous city in its entirety in Europe, the largest urban and metropolitan area in Europe,and the largest city by land area on the European continent.', '2024-06-14', '2024-06-21', 250, 'Moscow.jpg'),
(16, 'London - England', 'London is the capital and largest city of both England and the United Kingdom, with a population of around 8.8 million,[8] and its metropolitan area is the largest in Western Europe, with a population of 14.9 million.[9][c] It stands on the River Thames in south-east England at the head of a 50-mile (80 km) estuary down to the North Sea and has been a major settlement for nearly two millennia.[10] The City of London, its ancient core and financial centre, was founded by the Romans as Londinium and retains its medieval boundaries.[d][11] The City of Westminster, to the west of the City of London, has for centuries hosted the national government and parliament. In the 19th century, London grew rapidly, becoming the world\'s largest city at the time, as it expanded and absorbed the surrounding county of Middlesex, and parts of Surrey and Kent. In 1965 it was combined with parts of Essex and Hertfordshire[12] to create the administrative area of Greater London,[13] which is governed by 33 local authorities and the Greater London Authority.', '2024-05-30', '2024-06-05', 1000, 'london.jpg'),
(17, 'Bucharest - Romania', 'is the capital and largest city of Romania. The metropolis stands on the River Dâmbovița in south-eastern Romania. Its population is officially estimated at 1.76 million residents within a greater metropolitan area of 2.3 million residents, which makes Bucharest the 8th most-populous city in the European Union. The city area measures 240 km2 and comprises 6 districts (Sectoare), while the metropolitan area covers 1,811 km2. Bucharest is a beta global city, a major cultural, political and economic hub, and the country\'s seat of government.\r\n\r\nBucharest was first mentioned in documents in 1459. The city became capital in 1862 and is the centre of Romanian media, culture, and art. Its architecture is a mix of historical (mostly Eclectic, but also Neoclassical and Art Nouveau), interbellum (Bauhaus, Art Deco, and Romanian Revival architecture), socialist era, and modern. In the period between the two World Wars, the city\'s elegant architecture and the sophistication of its elite earned Bucharest the nicknames of Little Paris (Romanian: Micul Paris) or Paris of the East (Romanian: Parisul Estului).[6] Although buildings and districts in the historic city centre were heavily damaged or destroyed by war, earthquakes, and even Nicolae Ceaușescu\'s program of systematization, many survived and have been renovated. In recent years, the city has been experiencing an economic and cultural boom.', '2024-06-19', '2024-06-27', 1528, 'bucharest.jpg'),
(20, 'Maldives', 'The Maldives,[c] officially the Republic of Maldives,[d] and historically known as Maldive Islands, is a country and archipelagic state in South Asia in the Indian Ocean.[9] The Maldives is southwest of Sri Lanka and India, about 750 kilometres (470 miles; 400 nautical miles) from the Asian continent\'s mainland. The Maldives\' chain of 26 atolls stretches across the equator from Ihavandhippolhu Atoll in the north to Addu Atoll in the south.\r\n\r\nThe Maldives is the smallest country in Asia. Including the sea, the territory spans roughly 90,000 square kilometres (35,000 sq mi), and a land area of 298 square kilometres (115 sq mi). The Maldives is one of the world\'s most geographically dispersed sovereign states, and the smallest Muslim-majority country by land area.', '2024-06-14', '2024-06-21', 1500, 'maldives.jpeg'),
(22, 'Vienna - Austria', 'Vienna is the capital, most populous city, and one of nine federal states of Austria. It is Austria\'s primate city, with just over two million inhabitants.[11][12] Its larger metropolitan area has a population of nearly 2.9 million,[13] representing nearly one-third of the country\'s population. Vienna is the cultural, economic, and political center of the country, the fifth-largest city by population in the European Union, and the most-populous of the cities on the Danube river.\r\n\r\nThe city lies on the eastern edge of the Vienna Woods (Wienerwald), the northeasternmost foothills of the Alps, that separate Vienna from the more western parts of Austria, at the transition to the Pannonian Basin. It sits on the Danube, and is traversed by the highly regulated Wienfluss (Vienna River). Vienna is completely surrounded by Lower Austria, and lies around 50 km (31 mi) west of Slovakia and its capital Bratislava, 60 km (37 mi) northwest of Hungary, and 60 km (37 mi) south of Moravia (Czech Republic).', '2024-06-04', '2024-06-08', 563, 'vienna.webp'),
(23, 'Tel Aviv - Isral', 'el Aviv, is the most populous city in the Gush Dan metropolitan area of Israel. Located on the Israeli Mediterranean coastline and with a population of 474,530, it is the economic and technological center of the country and a global High tech hub. If East Jerusalem is considered part of Israel, Tel Aviv is the country\'s second-most-populous city, after Jerusalem; if not, Tel Aviv is the most populous city, ahead of West Jerusalem.[a]\r\n\r\nTel Aviv is governed by the Tel Aviv-Yafo Municipality, headed by Mayor Ron Huldai, and is home to most of Israel\'s foreign embassies.[b] It is a beta+ world city and is ranked 57th in the 2022 Global Financial Centres Index. Tel Aviv has the third- or fourth-largest economy and the largest economy per capita in the Middle East.[11][12] Tel Aviv is ranked the 4th top global startup ecosystem hub.[13][14] The city currently has the highest cost of living in the world.[15][16] Tel Aviv receives over 2.5 million international visitors annually.[17][18] Tel Aviv is home to Tel Aviv University, the largest university in the country with more than 30,000 students.', '2024-06-13', '2024-06-16', 638, 'tel-aviv.jpg'),
(24, 'Madrid - Spain', 'Madrid is the capital and most populous city of Spain. The city has almost 3.4 million inhabitants and a metropolitan area population of approximately 7 million. It is the second-largest city in the European Union (EU), and its monocentric metropolitan area is the second-largest in the EU.The municipality covers 604.3 km2 (233.3 sq mi) geographical area.[12] Madrid lies on the River Manzanares in the central part of the Iberian Peninsula at about 650 meters above mean sea level. The capital city of both Spain and the surrounding autonomous community of Madrid (since 1983),[13] it is also the political, economic, and cultural centre of the country.[14] The climate of Madrid features hot summers and cool winters.\r\n\r\nThe Madrid urban agglomeration has the second-largest GDP[15] in the European Union and its influence in politics, education, entertainment, environment, media, fashion, science, culture, and the arts all contribute to its status as one of the world\'s major global cities.Due to its economic output, high standard of living, and market size, Madrid is considered the major financial centre and the leading economic hub of the Iberian Peninsula and of Southern Europe', '2024-06-15', '2024-06-22', 699, 'madrid.webp'),
(25, 'Sri Lanka', 'Sri Lanka,[a] historically known as Ceylon and officially the Democratic Socialist Republic of Sri Lanka, is an island country in South Asia. It lies in the Indian Ocean, southwest of the Bay of Bengal, separated from the Indian peninsula by the Gulf of Mannar and the Palk Strait. It shares a maritime border with the Maldives in the southwest and India in the northwest.\r\n\r\nSri Lanka has a population of approximately 22 million and is home to many cultures, languages and ethnicities. The Sinhalese people form the majority of the population, followed by the Sri Lankan Tamils, who are the largest minority group and are concentrated in northern Sri Lanka; both groups have played an influential role in the island\'s history. Other long-established groups include the Moors, Indian Tamils, Burghers, Malays, Chinese, and Vedda.', '2024-06-16', '2024-06-24', 3125, 'srilanka.jpg'),
(29, 'Santorini - Greece', 'Santorini is an island in the southern Aegean Sea, about 200 km (120 mi) southeast from the Greek mainland. It is the largest island of a small, circular archipelago formed by the Santorini caldera. It is the southernmost member of the Cyclades group of islands, with an area of approximately 73 km2 (28 sq mi) and a 2021 census population of 15,480. The municipality of Santorini includes the inhabited islands of Santorini and Therasia, as well as the uninhabited islands of Nea Kameni, Palaia Kameni, Aspronisi and Christiana. The total land area is 90.623 km2 (34.990 sq mi).[3] Santorini is part of the Thira regional unit.', '2024-06-20', '2024-06-27', 528, 'santorini.jpg'),
(31, 'Barcelona - Spain.', 'is a city on the northeastern coast of Spain. It is the capital and largest city of the autonomous community of Catalonia, as well as the second-most populous municipality of Spain. With a population of 1.6 million within city limits,[8] its urban area extends to numerous neighbouring municipalities within the province of Barcelona and is home to around 4.8 million people,[3] making it the fifth most populous urban area in the European Union after Paris, the Ruhr area, Madrid and Milan.It is one of the largest metropolises on the Mediterranean Sea, located on the coast between the mouths of the rivers Llobregat and Besòs, bounded to the west by the Serra de Collserola mountain range.', '2024-06-21', '2024-06-28', 450, 'barcelona.jpg'),
(32, 'Budapest - Hungary', 'Budapest[a] is the capital and most populous city of Hungary. It is the ninth-largest city in the European Union by population within city limits and it was the largest city on the Danube river;[11][12][13] today it is the second largest one. The city has an estimated population of 1,752,286 over a land area of about 525 square kilometres (203 square miles).[14] Budapest, which is both a city and municipality, forms the centre of the Budapest metropolitan area, which has an area of 7,626 square kilometres (2,944 square miles) and a population of 3,303,786. It is a primate city, constituting 33% of the population of Hungary.[15][16]\r\n\r\nThe history of Budapest began when an early Celtic settlement transformed into the Roman town of Aquincum,[17][18] the capital of Lower Pannonia.[17] The Hungarians arrived in the territory in the late 9th century,[19] but the area was pillaged by the Mongols in 1241–42.[20] Re-established Buda became one of the centres of Renaissance humanist culture by the 15th century.[21][22][23] The Battle of Mohács, in 1526, was followed by nearly 150 years of Ottoman rule.[24] After the reconquest of Buda in 1686, the region entered a new age of prosperity, with Pest-Buda becoming a global city after the unification of Buda, Óbuda and Pest on 17 November 1873, with the name \'Budapest\' given to the new capital.[14][25] Budapest also became the co-capital of the Austro-Hungarian Empire,[26] a great power that dissolved in 1918, following World War I. The city was the focal point of the Hungarian Revolution of 1848 and the Battle of Budapest in 1945, as well as the Hungarian Revolution of 1956.', '2024-06-20', '2024-06-27', 680, 'budapest.jfif'),
(39, 'Zanzibar', 'Zanzibar is an insular semi-autonomous region which united with Tanganyika in 1964 to form the United Republic of Tanzania. It is an archipelago in the Indian Ocean, 25–50 km (16–31 mi) off the coast of the African mainland, and consists of many small islands and two large ones: Unguja (the main island, referred to informally as Zanzibar) and Pemba Island.', '2024-06-15', '2024-06-21', 2200, 'zanzibar.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
