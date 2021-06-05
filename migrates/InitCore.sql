

-- actions table
CREATE TABLE IF NOT EXISTS `actions` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `type` varchar(30) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `actions` (`id`, `name`, `type`, `sort`) VALUES
(1, 'translates', 'page', 0),
(2, 'customers', 'page', 0),
(3, '/', 'page', 0),
(4, 'logs', 'page', 0),
(5, 'settings', 'page', 0),
(6, 'rights', 'page', 0),
(7, 'add_default_word', 'action', 0),
(8, 'files', 'page', 0),
(9, 'statistic', 'page', 0),
(10, 'categories', 'page', 0),
(11, 'crm', 'page', 0),
(12, 'home', 'page', -1),
(13, 'goods', 'page', 0),
(14, 'content', 'page', 1);
-- actions table

-- modules table
CREATE TABLE IF NOT EXISTS `modules` (
                           `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `name` varchar(50) NOT NULL,
                           `path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `modules` (`id`, `name`, `path`) VALUES
(1, 'Auther', ''),
(2, 'Languager', ''),
(3, 'Menu', ''),
(7, 'Rights', ''),
(8, 'Filer', ''),
(9, 'Statistic', ''),
(10, 'Categorier', ''),
(11, 'Customers', ''),
(12, 'Crm', ''),
(13, 'Home', ''),
(14, 'Goodser', ''),
(15, 'contenter', '');
CREATE TABLE IF NOT EXISTS `modules_on_page` (
   `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `page_id` int(255) NOT NULL,
   `module_id` int(255) NOT NULL,
   `sort` int(255) NOT NULL,
   KEY `page_id` (`page_id`),
   KEY `module_id` (`module_id`),
   CONSTRAINT `modules_gr_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT `modules_page_1` FOREIGN KEY (`page_id`) REFERENCES `actions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
-- modules table

-- Groups table
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `groups` (`id`, `name`, `value`) VALUES
(1, 'super', 'Superuser'),
(2, 'admin', 'Administrators'),
(3, 'user', 'Users');

CREATE TABLE IF NOT EXISTS `group_rights` (
    `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `group_id` int(255) NOT NULL,
    `action_id` int(255) NOT NULL,
    `access` tinyint(4) NOT NULL,
    KEY `group_id` (`group_id`),
    KEY `action_id` (`action_id`),
    CONSTRAINT `rights_group_gr_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `rights_gr_1` FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Groups table


-- Users table
CREATE TABLE IF NOT EXISTS `users` (
     `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
     `login` varchar(50) NOT NULL,
     `password` text NOT NULL,
     `group_id` int(255) NOT NULL,
     CONSTRAINT `user_group_gr_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`login`, `password`, `group_id`) VALUES
('root', '$2y$10$sC/a4oOF6EGxeLqFiDooqOX4aE4VpDWsORbQd3i0fw5p.mXFZ0rPu', 1);

CREATE TABLE IF NOT EXISTS `users_meta` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) DEFAULT NULL,
  `second_name` varchar(50) DEFAULT NULL,
  `patronymic` varchar(30) DEFAULT NULL,
  `country_id` int(255) DEFAULT NULL,
  `day` int(3) DEFAULT NULL,
  `month` int(2) DEFAULT NULL,
  `year` int(4) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `iin` varchar(12) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `u_id` int(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(6) DEFAULT NULL,
  KEY `u_id` (`u_id`),
  CONSTRAINT `users_gr_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `users_meta` ( `name`, `second_name`,`u_id`, `email`) VALUES('Admin', 'Root', 1, 'root');

CREATE TABLE IF NOT EXISTS `temp_users` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `mail` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `add_date` datetime NOT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Users table



 -- Categories table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `code` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `c_desc` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `parent` int(255) DEFAULT NULL,
  `sort` int(10) DEFAULT NULL,
  `mkeys` varchar(80) DEFAULT NULL,
  `mdesc` varchar(160) DEFAULT NULL,
  UNIQUE KEY (`id`),
  KEY `c_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;
CREATE TABLE IF NOT EXISTS `category_properties` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `c_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `p_desc` varchar(255) DEFAULT NULL,
  `p_type` varchar(6) NOT NULL,
  `sort` int(10) DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `category_gr_1` (`c_id`),
  CONSTRAINT `category_gr_1` FOREIGN KEY (`c_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;
-- Categories table

-- Consultant table
CREATE TABLE IF NOT EXISTS `consultant_chats` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uId` int(255) NOT NULL,
  `answerUid` int(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `source` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `consultant_messages` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uId` int(255) DEFAULT NULL,
  `source` varchar(20) DEFAULT NULL,
  `dialogId` int(255) NOT NULL,
  `message` text NOT NULL,
  `status` tinyint(5) NOT NULL,
  `addDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Consultant table

-- Content table
CREATE TABLE IF NOT EXISTS `content_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` longtext DEFAULT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `common_id` int(255) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `date` datetime NOT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Content table

-- Countries table
CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(40) NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `countries` (`id`, `name`, `code`) VALUES
(1, 'Abkhazia', 'ab'),
(2, 'Afghanistan', 'af'),
(3, 'Albania', 'al'),
(4, 'Algeria', 'dz'),
(5, 'American Samoa', 'as'),
(6, 'Andorra', 'ad'),
(7, 'Angola', 'ao'),
(8, 'Antigua and Barbuda', 'ag'),
(9, 'Argentina', 'ar'),
(10, 'Armenia', 'am'),
(11, 'Australia', 'au'),
(12, 'Austria', 'at'),
(13, 'Azerbaijan', 'az'),
(14, 'Bahamas', 'bs'),
(15, 'Bahrain', 'bh'),
(16, 'Bangladesh', 'bd'),
(17, 'Barbados', 'bb'),
(18, 'Belarus', 'by'),
(19, 'Belgium', 'be'),
(20, 'Belize', 'bz'),
(21, 'Benin', 'bj'),
(22, 'Bolivia', 'bo'),
(23, 'Bosnia and Herzegovina', 'ba'),
(24, 'Botswana', 'bw'),
(25, 'Brazil', 'br'),
(26, 'Brunei', 'bn'),
(27, 'Bulgaria', 'bg'),
(28, 'Burkina Faso', 'bf'),
(29, 'Burundi', 'bi'),
(30, 'Butane', 'bt'),
(31, 'Cambodia', 'kh'),
(32, 'Cameroon', 'cm'),
(33, 'Canada', 'ca'),
(34, 'Cape Verde', 'cv'),
(35, 'CAR', 'cf'),
(36, 'Chad', 'td'),
(37, 'Chile', 'cl'),
(38, 'China', 'cn'),
(39, 'Colombia', 'co'),
(40, 'Comoros', 'km'),
(41, 'Costa Rica', 'cr'),
(42, 'Cote d’Ivoire', 'ci'),
(43, 'Croatia', 'hr'),
(44, 'Cuba', 'cu'),
(45, 'Cyprus', 'cy'),
(46, 'Czech', 'cz'),
(47, 'Denmark', 'dk'),
(48, 'Djibouti', 'dj'),
(49, 'Dominica', 'dm'),
(50, 'Dominican Republic', 'do'),
(51, 'DPRK', 'kp'),
(52, 'DR Congo', 'cd'),
(53, 'Ecuador', 'ec'),
(54, 'Egypt', 'eg'),
(55, 'Equatorial Guinea', 'gq'),
(56, 'Eritrea', 'er'),
(57, 'Estonia', 'ee'),
(58, 'Ethiopia', 'et'),
(59, 'Federated States of Micronesia', 'fm'),
(60, 'Fiji', 'fj'),
(61, 'Finland', 'fi'),
(62, 'France', 'fr'),
(63, 'Gabon', 'ga'),
(64, 'Gambia', 'gm'),
(65, 'Georgia', 'ge'),
(66, 'Germany', 'de'),
(67, 'Ghana', 'gh'),
(68, 'Greece', 'gr'),
(69, 'Grenada', 'gd'),
(70, 'Guatemala', 'gt'),
(71, 'Guinea', 'gn'),
(72, 'Guinea bissau', 'gw'),
(73, 'Guyana', 'gy'),
(74, 'Haiti', 'ht'),
(75, 'Honduras', 'hn'),
(76, 'Hungary', 'hu'),
(77, 'Iceland', 'is'),
(78, 'Indonesia', 'id'),
(79, 'Iran', 'ir'),
(80, 'Iraq', 'iq'),
(81, 'Ireland', 'ie'),
(82, 'Israel', 'il'),
(83, 'Italy', 'it'),
(84, 'Jamaica', 'jm'),
(85, 'Japan', 'jp'),
(86, 'Jordan', 'jo'),
(87, 'Kazakhstan', 'kz'),
(88, 'Kenya', 'ke'),
(89, 'Kiribati', 'ki'),
(90, 'Kuwait', 'kw'),
(91, 'Kyrgyzstan', 'kg'),
(92, 'Laos', 'la'),
(93, 'Latvia', 'lv'),
(94, 'Lebanon', 'lb'),
(95, 'Lesotho', 'ls'),
(96, 'Liberia', 'lr'),
(97, 'Libya', 'ly'),
(98, 'Liechtenstein', 'li'),
(99, 'Lithuania', 'lt'),
(100, 'Luxembourg', 'lu'),
(101, 'Macedonia', 'mk'),
(102, 'Madagascar', 'mg'),
(103, 'Malawi', 'mw'),
(104, 'Malaysia', 'my'),
(105, 'Maldives', 'mv'),
(106, 'Mali', 'ml'),
(107, 'Malta', 'mt'),
(108, 'Marshall Islands', 'mh'),
(109, 'Mauritania', 'mr'),
(110, 'Mauritius', 'mu'),
(111, 'Mexico', 'mx'),
(112, 'Moldova', 'md'),
(113, 'Monaco', 'mc'),
(114, 'Mongolia', 'mn'),
(115, 'Montenegro', 'me'),
(116, 'Morocco', 'ma'),
(117, 'Mozambique', 'mz'),
(118, 'Myanmar', 'mm'),
(119, 'Namibia', 'na'),
(120, 'Nauru', 'nr'),
(121, 'Nepal', 'np'),
(122, 'Netherlands', 'nl'),
(123, 'New Zealand', 'nz'),
(124, 'Nicaragua', 'ni'),
(125, 'Niger', 'ne'),
(126, 'Nigeria', 'ng'),
(127, 'Norway', 'no'),
(128, 'Oman', 'om'),
(129, 'Pakistan', 'pk'),
(130, 'Palau', 'pw'),
(131, 'Panama', 'pa'),
(132, 'Papua New Guinea', 'pg'),
(133, 'Paraguay', 'py'),
(134, 'Peru', 'pe'),
(135, 'Philippines', 'ph'),
(136, 'Poland', 'pl'),
(137, 'Portugal', 'pt'),
(138, 'Qatar', 'qa'),
(139, 'Republic of the Congo', 'cg'),
(140, 'Romania', 'ro'),
(141, 'Russia', 'ru'),
(142, 'Rwanda', 'rw'),
(143, 'Saint Kitts and Nevis', 'kn'),
(144, 'Saint lucia', 'lc'),
(145, 'Saint Vincent and the Grenadines', 'vc'),
(146, 'Salvador', 'sv'),
(147, 'San marino', 'sm'),
(148, 'Sao Tome and Principe', 'st'),
(149, 'Saudi Arabia', 'sa'),
(150, 'Senegal', 'sn'),
(151, 'Serbia', 'rs'),
(152, 'Seychelles', 'sc'),
(153, 'Sierra leone', 'sl'),
(154, 'Singapore', 'sg'),
(155, 'Slovakia', 'sk'),
(156, 'Slovenia', 'si'),
(157, 'Solomon islands', 'sb'),
(158, 'Somalia', 'so'),
(159, 'South Africa', 'za'),
(160, 'South Ossetia', 'os'),
(161, 'South Sudan', 'ss'),
(162, 'Spain', 'es'),
(163, 'Sri Lanka', 'lk'),
(164, 'State of Palestine', 'ps'),
(165, 'Sudan', 'sd'),
(166, 'Suriname', 'sr'),
(167, 'Swaziland', 'sz'),
(168, 'Sweden', 'se'),
(169, 'Switzerland', 'ch'),
(170, 'Syria', 'sy'),
(171, 'Tajikistan', 'tj'),
(172, 'Tanzania', 'tz'),
(173, 'Thailand', 'th'),
(174, 'The Republic of Korea', 'kr'),
(175, 'Togo', 'tg'),
(176, 'Tonga', 'to'),
(177, 'Trinidad and Tobago', 'tt'),
(178, 'Tunisia', 'tn'),
(179, 'Turkey', 'tr'),
(180, 'Turkmenistan', 'tm'),
(181, 'Tuvalu', 'tv'),
(182, 'UAE', 'ae'),
(183, 'Uganda', 'ug'),
(184, 'Ukraine', 'ua'),
(185, 'United Kingdom', 'gb'),
(186, 'Uruguay', 'uy'),
(187, 'USA', 'us'),
(188, 'Uzbekistan', 'uz'),
(189, 'Vanuatu', 'vu'),
(190, 'Vatican', 'va'),
(191, 'Venezuela', 've'),
(192, 'Vietnam', 'vn'),
(193, 'Yemen', 'ye'),
(194, 'Zambia', 'zm'),
(195, 'Zimbabwe', 'zw');
-- Countries table


CREATE TABLE IF NOT EXISTS `crm_orders` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `name` text DEFAULT NULL,
  `form_order` text DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Goods table
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `article` text DEFAULT NULL,
  `model` text DEFAULT NULL,
  `manufac` text DEFAULT NULL,
  `c_id` int(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `sale` float DEFAULT NULL,
  `avail` float DEFAULT NULL,
  `weight` float NOT NULL,
  `sort` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `meta_keywords` text DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `images` text DEFAULT NULL,
  CONSTRAINT `goods_gr_1` FOREIGN KEY (`c_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `goods_props` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `goods_id` int(255) NOT NULL,
  `prop_id` int(255) NOT NULL,
  `prop_value` text NOT NULL,
   CONSTRAINT `goods_props_gr_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Goods table

--
CREATE TABLE IF NOT EXISTS `logs` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `type` varchar(15) NOT NULL,
  `title` text NOT NULL,
  `desc` text NOT NULL,
  `u_id` int(255) DEFAULT NULL,
  `ip` varchar(16) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--

--
CREATE TABLE IF NOT EXISTS `props_list` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` text NOT NULL,
  `sort` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `props_list_vals` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `prop_id` int(255) NOT NULL,
  `value` text NOT NULL,
  `sort` int(20) NOT NULL,
  KEY `prop_id` (`prop_id`),
  CONSTRAINT `props_vals_gr_1` FOREIGN KEY (`prop_id`) REFERENCES `props_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--

--
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `token` text NOT NULL,
  `u_id` int(255) NOT NULL,
  `add_date` datetime NOT NULL,
  `live` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--

-- Languages table
CREATE TABLE IF NOT EXISTS `languages` (
   `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `lang` varchar(5) NOT NULL,
   `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `languages` (`id`, `lang`, `value`) VALUES
(1, 'en', 'English'),
(2, 'ru', 'Русский');
CREATE TABLE IF NOT EXISTS `words` (
                                       `id` int(255) NOT NULL PRIMARY KEY  AUTO_INCREMENT,
                                       `lang_id` int(255) NOT NULL,
                                       `value` text NOT NULL,
                                       `type` varchar(10) NOT NULL,
                                       KEY (`lang_id`),
                                       CONSTRAINT `words_lang_gr_1` FOREIGN KEY (`lang_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `words` (`lang_id`, `value`, `type`) VALUES
(1, 'Authorization', 'sys'),
(1, 'Login', 'sys'),
(1, 'Password', 'sys'),
(1, 'Wrong login', 'sys'),
(1, 'Type of access:', 'sys'),
(1, 'Profile', 'sys'),
(1, 'Good Morning,', 'sys'),
(1, 'Phrase', 'sys'),
(1, 'Type', 'sys'),
(1, 'System', 'sys'),
(1, 'Site', 'sys'),
(1, 'Adding a phrase', 'sys'),
(1, 'Search', 'sys'),
(1, 'Translates', 'sys'),
(1, 'Back', 'sys'),
(1, 'Choose language', 'sys'),
(1, 'Save', 'sys'),
(1, 'Translate', 'sys'),
(1, 'Administrator', 'sys'),
(1, 'Main', 'sys'),
(1, 'Statistic', 'sys'),
(1, 'Participants', 'sys'),
(1, 'Users', 'sys'),
(1, 'Add a user', 'sys'),
(1, 'Full name', 'sys'),
(1, 'Phone', 'site'),
(1, 'Access', 'sys'),
(1, 'Name', 'sys'),
(1, 'Exit', 'sys'),
(1, 'Edit a phrase', 'sys'),
(1, 'Clear', 'sys'),
(1, 'Surname', 'sys'),
(1, 'Group', 'sys'),
(1, 'Confirm password', 'sys'),
(1, 'Adding a user', 'sys'),
(1, 'Access denied', 'sys'),
(1, 'Translate saved', 'sys'),
(1, 'Phrase added', 'sys'),
(1, 'Description', 'sys'),
(1, 'Logs', 'sys'),
(1, 'Administrators', 'sys'),
(1, 'Password not equals', 'sys'),
(1, 'SuperUser', 'sys'),
(1, 'User added', 'sys'),
(1, 'Rights', 'sys'),
(1, 'Choose group', 'sys'),
(1, 'Customers', 'sys'),
(1, 'Choose page', 'sys'),
(1, 'Action availability', 'sys'),
(1, 'Module availability', 'sys'),
(1, 'Settings', 'sys'),
(1, 'Items per page', 'sys'),
(1, 'Lifetime', 'sys'),
(1, 'Log head length', 'sys'),
(1, 'Log description length', 'sys'),
(1, 'Categories', 'sys'),
(1, 'User profile', 'sys'),
(1, 'Edit profile', 'sys'),
(1, 'Choose type', 'sys'),
(1, 'Orders', 'sys'),
(1, 'Order form', 'sys'),
(1, 'FIO', 'sys'),
(1, 'Home page', 'sys'),
(1, 'Home', 'sys'),
(1, 'Adding a customer', 'sys'),
(1, 'Customer saved', 'sys'),
(1, 'Date', 'sys'),
(1, 'Files', 'sys'),
(1, 'Goods', 'sys'),
(1, 'Price', 'sys'),
(1, 'Available', 'sys'),
(1, 'Category', 'sys'),
(1, 'Article', 'sys'),
(1, 'Title', 'sys'),
(1, 'Image', 'sys'),
(1, 'Adding a product', 'sys'),
(1, 'Characteristics', 'sys'),
(1, 'Sale', 'sys'),
(1, 'Manufacturer', 'sys'),
(1, 'Sort', 'sys'),
(1, 'Weight', 'sys'),
(1, 'Model', 'sys'),
(1, 'List', 'sys'),
(1, 'Line', 'sys'),
(1, 'New category', 'sys'),
(1, 'Add category', 'sys'),
(1, 'Add prop list', 'sys'),
(1, 'Save prop list', 'sys'),
(1, 'Edit category', 'sys'),
(1, 'Updated', 'sys'),
(1, 'Saved', 'sys'),
(1, 'Category saved', 'sys'),
(1, 'Category updated', 'sys'),
(1, 'Parent', 'sys'),
(1, 'Adding a service', 'sys'),
(1, 'Services', 'sys'),
(1, 'Add service', 'sys');
CREATE TABLE IF NOT EXISTS `translates` (
    `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lang_id` int(255) NOT NULL,
    `word_id` int(255) NOT NULL,
    `translate` text NOT NULL,
    KEY `lang_id` (`lang_id`),
    KEY `word_id` (`word_id`),
    CONSTRAINT `translates_lang_gr_1` FOREIGN KEY (`lang_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `translates_word_gr_1` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Languages table