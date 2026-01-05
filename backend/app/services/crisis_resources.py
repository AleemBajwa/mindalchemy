"""
Country-specific crisis resources mapping
"""
CRISIS_RESOURCES = {
    'US': {
        'emergency': '911',
        'hotlines': [
            {
                'name': 'National Suicide Prevention Lifeline',
                'number': '988',
                'description': '24/7 free and confidential support',
                'available': '24/7',
                'link': 'tel:988'
            },
            {
                'name': 'Crisis Text Line',
                'number': 'Text HOME to 741741',
                'description': 'Free 24/7 crisis support via text',
                'available': '24/7',
                'link': 'sms:741741?body=HOME'
            },
            {
                'name': 'Emergency Services',
                'number': '911',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:911'
            },
            {
                'name': 'National Domestic Violence Hotline',
                'number': '1-800-799-7233',
                'description': 'Support for domestic violence situations',
                'available': '24/7',
                'link': 'tel:18007997233'
            },
            {
                'name': 'SAMHSA National Helpline',
                'number': '1-800-662-4357',
                'description': 'Substance abuse and mental health services',
                'available': '24/7',
                'link': 'tel:18006624357'
            }
        ],
        'online_resources': [
            {
                'name': 'Crisis Text Line',
                'url': 'https://www.crisistextline.org',
                'description': 'Free crisis support via text message'
            },
            {
                'name': 'National Suicide Prevention Lifeline',
                'url': 'https://988lifeline.org',
                'description': '988 Suicide & Crisis Lifeline'
            },
            {
                'name': 'Mental Health America',
                'url': 'https://www.mhanational.org',
                'description': 'Mental health resources and screening tools'
            },
            {
                'name': 'NAMI (National Alliance on Mental Illness)',
                'url': 'https://www.nami.org',
                'description': 'Support, education, and advocacy'
            }
        ]
    },
    'PK': {  # Pakistan
        'emergency': '15',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '15',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:15'
            },
            {
                'name': 'Police Emergency',
                'number': '15',
                'description': 'Police emergency services',
                'available': '24/7',
                'link': 'tel:15'
            },
            {
                'name': 'Aman Foundation Helpline',
                'number': '111-11-AMAN (111-11-2626)',
                'description': 'Mental health and crisis support',
                'available': '24/7',
                'link': 'tel:111112626'
            },
            {
                'name': 'Rozan Helpline',
                'number': '0800-22444',
                'description': 'Support for emotional and psychological issues',
                'available': '24/7',
                'link': 'tel:080022444'
            },
            {
                'name': 'Sehat Tahaffuz Helpline',
                'number': '1166',
                'description': 'Health emergency helpline',
                'available': '24/7',
                'link': 'tel:1166'
            }
        ],
        'online_resources': [
            {
                'name': 'Rozan',
                'url': 'https://www.rozan.org',
                'description': 'Mental health and emotional support services'
            },
            {
                'name': 'Aman Foundation',
                'url': 'https://www.amanfoundation.org',
                'description': 'Mental health and crisis support'
            },
            {
                'name': 'Pakistan Mental Health Association',
                'url': 'https://www.pmha.org.pk',
                'description': 'Mental health resources and support'
            }
        ]
    },
    'IN': {  # India
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'Unified emergency number for all emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Police Emergency',
                'number': '100',
                'description': 'Police emergency services',
                'available': '24/7',
                'link': 'tel:100'
            },
            {
                'name': 'Vandrevala Foundation',
                'number': '1860-2662-345',
                'description': '24/7 mental health helpline',
                'available': '24/7',
                'link': 'tel:18602662345'
            },
            {
                'name': 'iCall Psychosocial Helpline',
                'number': '022-25521111',
                'description': 'Mental health support (Mon-Sat, 8am-10pm)',
                'available': 'Mon-Sat, 8am-10pm',
                'link': 'tel:02225521111'
            },
            {
                'name': 'Sneha Suicide Prevention Helpline',
                'number': '044-24640050',
                'description': '24/7 suicide prevention support',
                'available': '24/7',
                'link': 'tel:04424640050'
            },
            {
                'name': 'Aasra Suicide Prevention',
                'number': '91-22-27546669',
                'description': '24/7 suicide prevention helpline',
                'available': '24/7',
                'link': 'tel:912227546669'
            }
        ],
        'online_resources': [
            {
                'name': 'Vandrevala Foundation',
                'url': 'https://www.vandrevalafoundation.com',
                'description': 'Mental health support and resources'
            },
            {
                'name': 'iCall',
                'url': 'https://icallhelpline.org',
                'description': 'Psychosocial helpline and resources'
            },
            {
                'name': 'Sneha Foundation',
                'url': 'https://www.snehaindia.org',
                'description': 'Suicide prevention and mental health support'
            },
            {
                'name': 'Aasra',
                'url': 'https://www.aasra.info',
                'description': 'Suicide prevention helpline'
            }
        ]
    },
    'GB': {  # United Kingdom
        'emergency': '999',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '999',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:999'
            },
            {
                'name': 'Samaritans',
                'number': '116 123',
                'description': '24/7 free emotional support',
                'available': '24/7',
                'link': 'tel:116123'
            },
            {
                'name': 'Crisis Text Line UK',
                'number': 'Text SHOUT to 85258',
                'description': 'Free 24/7 crisis support via text',
                'available': '24/7',
                'link': 'sms:85258?body=SHOUT'
            },
            {
                'name': 'Mind Infoline',
                'number': '0300 123 3393',
                'description': 'Mental health information and support',
                'available': 'Mon-Fri, 9am-6pm',
                'link': 'tel:03001233393'
            }
        ],
        'online_resources': [
            {
                'name': 'Samaritans',
                'url': 'https://www.samaritans.org',
                'description': '24/7 emotional support'
            },
            {
                'name': 'Mind',
                'url': 'https://www.mind.org.uk',
                'description': 'Mental health information and support'
            },
            {
                'name': 'Crisis Text Line UK',
                'url': 'https://www.crisistextline.uk',
                'description': 'Free crisis support via text'
            }
        ]
    },
    'CA': {  # Canada
        'emergency': '911',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '911',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:911'
            },
            {
                'name': 'Crisis Services Canada',
                'number': '1-833-456-4566',
                'description': '24/7 suicide prevention and support',
                'available': '24/7',
                'link': 'tel:18334564566'
            },
            {
                'name': 'Kids Help Phone',
                'number': '1-800-668-6868',
                'description': '24/7 support for young people',
                'available': '24/7',
                'link': 'tel:18006686868'
            },
            {
                'name': 'Crisis Text Line Canada',
                'number': 'Text HOME to 686868',
                'description': 'Free 24/7 crisis support via text',
                'available': '24/7',
                'link': 'sms:686868?body=HOME'
            }
        ],
        'online_resources': [
            {
                'name': 'Crisis Services Canada',
                'url': 'https://www.crisisservicescanada.ca',
                'description': 'Suicide prevention and crisis support'
            },
            {
                'name': 'Kids Help Phone',
                'url': 'https://kidshelpphone.ca',
                'description': 'Support for young people'
            },
            {
                'name': 'Canadian Mental Health Association',
                'url': 'https://www.cmha.ca',
                'description': 'Mental health resources and support'
            }
        ]
    },
    'AU': {  # Australia
        'emergency': '000',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '000',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:000'
            },
            {
                'name': 'Lifeline Australia',
                'number': '13 11 14',
                'description': '24/7 crisis support and suicide prevention',
                'available': '24/7',
                'link': 'tel:131114'
            },
            {
                'name': 'Beyond Blue',
                'number': '1300 22 4636',
                'description': '24/7 mental health support',
                'available': '24/7',
                'link': 'tel:1300224636'
            },
            {
                'name': 'Kids Helpline',
                'number': '1800 55 1800',
                'description': '24/7 support for young people',
                'available': '24/7',
                'link': 'tel:1800551800'
            }
        ],
        'online_resources': [
            {
                'name': 'Lifeline Australia',
                'url': 'https://www.lifeline.org.au',
                'description': '24/7 crisis support'
            },
            {
                'name': 'Beyond Blue',
                'url': 'https://www.beyondblue.org.au',
                'description': 'Mental health information and support'
            },
            {
                'name': 'Kids Helpline',
                'url': 'https://kidshelpline.com.au',
                'description': 'Support for young people'
            }
        ]
    },
    'DE': {  # Germany
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Telefonseelsorge',
                'number': '0800 111 0 111',
                'description': '24/7 emotional support and crisis intervention',
                'available': '24/7',
                'link': 'tel:08001110111'
            },
            {
                'name': 'Nummer gegen Kummer',
                'number': '116 111',
                'description': 'Youth helpline (Mon-Sat, 2pm-8pm)',
                'available': 'Mon-Sat, 2pm-8pm',
                'link': 'tel:116111'
            }
        ],
        'online_resources': [
            {
                'name': 'Telefonseelsorge',
                'url': 'https://www.telefonseelsorge.de',
                'description': '24/7 emotional support'
            },
            {
                'name': 'Nummer gegen Kummer',
                'url': 'https://www.nummergegenkummer.de',
                'description': 'Youth support services'
            }
        ]
    },
    'FR': {  # France
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'SOS Amitié',
                'number': '09 72 39 40 50',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:0972394050'
            },
            {
                'name': 'Suicide Écoute',
                'number': '01 45 39 40 00',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:0145394000'
            }
        ],
        'online_resources': [
            {
                'name': 'SOS Amitié',
                'url': 'https://www.sos-amitie.org',
                'description': '24/7 emotional support'
            }
        ]
    },
    'ES': {  # Spain
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Teléfono de la Esperanza',
                'number': '717 003 717',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:717003717'
            }
        ],
        'online_resources': [
            {
                'name': 'Teléfono de la Esperanza',
                'url': 'https://www.telefonodelaesperanza.org',
                'description': '24/7 emotional support'
            }
        ]
    },
    'IT': {  # Italy
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Telefono Amico',
                'number': '199 284 284',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:199284284'
            }
        ],
        'online_resources': [
            {
                'name': 'Telefono Amico',
                'url': 'https://www.telefonoamico.it',
                'description': '24/7 emotional support'
            }
        ]
    },
    'BR': {  # Brazil
        'emergency': '192',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '192',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:192'
            },
            {
                'name': 'Centro de Valorização da Vida (CVV)',
                'number': '188',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:188'
            }
        ],
        'online_resources': [
            {
                'name': 'CVV',
                'url': 'https://www.cvv.org.br',
                'description': '24/7 suicide prevention'
            }
        ]
    },
    'MX': {  # Mexico
        'emergency': '911',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '911',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:911'
            },
            {
                'name': 'Línea de la Vida',
                'number': '800 911 2000',
                'description': '24/7 mental health support',
                'available': '24/7',
                'link': 'tel:8009112000'
            }
        ],
        'online_resources': [
            {
                'name': 'Línea de la Vida',
                'url': 'https://www.gob.mx/salud',
                'description': 'Mental health support'
            }
        ]
    },
    'AR': {  # Argentina
        'emergency': '911',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '911',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:911'
            },
            {
                'name': 'Centro de Asistencia al Suicida',
                'number': '135',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:135'
            }
        ],
        'online_resources': [
            {
                'name': 'Centro de Asistencia al Suicida',
                'url': 'https://www.casbuenosaires.org.ar',
                'description': 'Suicide prevention'
            }
        ]
    },
    'ZA': {  # South Africa
        'emergency': '10111',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '10111',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:10111'
            },
            {
                'name': 'Lifeline South Africa',
                'number': '0861 322 322',
                'description': '24/7 crisis support',
                'available': '24/7',
                'link': 'tel:0861322322'
            }
        ],
        'online_resources': [
            {
                'name': 'Lifeline South Africa',
                'url': 'https://lifeline.co.za',
                'description': '24/7 crisis support'
            }
        ]
    },
    'NG': {  # Nigeria
        'emergency': '199',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '199',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:199'
            },
            {
                'name': 'Lagos State Emergency',
                'number': '767',
                'description': 'Emergency services',
                'available': '24/7',
                'link': 'tel:767'
            }
        ],
        'online_resources': []
    },
    'EG': {  # Egypt
        'emergency': '123',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '123',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:123'
            }
        ],
        'online_resources': []
    },
    'SA': {  # Saudi Arabia
        'emergency': '911',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '911',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:911'
            },
            {
                'name': 'National Center for Mental Health Promotion',
                'number': '920033360',
                'description': 'Mental health support',
                'available': '24/7',
                'link': 'tel:920033360'
            }
        ],
        'online_resources': []
    },
    'AE': {  # UAE
        'emergency': '999',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '999',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:999'
            }
        ],
        'online_resources': []
    },
    'TR': {  # Turkey
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            }
        ],
        'online_resources': []
    },
    'JP': {  # Japan
        'emergency': '110',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '110',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:110'
            },
            {
                'name': 'Inochi no Denwa',
                'number': '0120-738-556',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:0120738556'
            }
        ],
        'online_resources': [
            {
                'name': 'Inochi no Denwa',
                'url': 'https://www.inochinodenwa.org',
                'description': 'Suicide prevention'
            }
        ]
    },
    'KR': {  # South Korea
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'LifeLine Korea',
                'number': '1588-9191',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:15889191'
            }
        ],
        'online_resources': []
    },
    'CN': {  # China
        'emergency': '110',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '110',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:110'
            },
            {
                'name': 'Beijing Suicide Research and Prevention Center',
                'number': '400-161-9995',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:4001619995'
            }
        ],
        'online_resources': []
    },
    'ID': {  # Indonesia
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            }
        ],
        'online_resources': []
    },
    'PH': {  # Philippines
        'emergency': '911',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '911',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:911'
            },
            {
                'name': 'Hopeline Philippines',
                'number': '(02) 804-4673',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:028044673'
            }
        ],
        'online_resources': []
    },
    'TH': {  # Thailand
        'emergency': '191',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '191',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:191'
            },
            {
                'name': 'Samaritans of Thailand',
                'number': '02-713-6791',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:027136791'
            }
        ],
        'online_resources': []
    },
    'VN': {  # Vietnam
        'emergency': '113',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '113',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:113'
            }
        ],
        'online_resources': []
    },
    'MY': {  # Malaysia
        'emergency': '999',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '999',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:999'
            },
            {
                'name': 'Befrienders KL',
                'number': '03-7627 2929',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:0376272929'
            }
        ],
        'online_resources': [
            {
                'name': 'Befrienders',
                'url': 'https://www.befrienders.org.my',
                'description': '24/7 emotional support'
            }
        ]
    },
    'SG': {  # Singapore
        'emergency': '999',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '999',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:999'
            },
            {
                'name': 'Samaritans of Singapore',
                'number': '1-767',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:1767'
            }
        ],
        'online_resources': [
            {
                'name': 'Samaritans of Singapore',
                'url': 'https://www.sos.org.sg',
                'description': '24/7 suicide prevention'
            }
        ]
    },
    'NZ': {  # New Zealand
        'emergency': '111',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '111',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:111'
            },
            {
                'name': 'Lifeline Aotearoa',
                'number': '0800 543 354',
                'description': '24/7 crisis support',
                'available': '24/7',
                'link': 'tel:0800543354'
            }
        ],
        'online_resources': [
            {
                'name': 'Lifeline Aotearoa',
                'url': 'https://www.lifeline.org.nz',
                'description': '24/7 crisis support'
            }
        ]
    },
    'IE': {  # Ireland
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Samaritans Ireland',
                'number': '116 123',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:116123'
            }
        ],
        'online_resources': [
            {
                'name': 'Samaritans Ireland',
                'url': 'https://www.samaritans.ie',
                'description': '24/7 emotional support'
            }
        ]
    },
    'NL': {  # Netherlands
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': '113 Zelfmoordpreventie',
                'number': '0900-0113',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:09000113'
            }
        ],
        'online_resources': [
            {
                'name': '113 Zelfmoordpreventie',
                'url': 'https://www.113.nl',
                'description': '24/7 suicide prevention'
            }
        ]
    },
    'BE': {  # Belgium
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Centrum ter Preventie van Zelfdoding',
                'number': '1813',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:1813'
            }
        ],
        'online_resources': []
    },
    'CH': {  # Switzerland
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Die Dargebotene Hand',
                'number': '143',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:143'
            }
        ],
        'online_resources': []
    },
    'SE': {  # Sweden
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Mind',
                'number': '901 01',
                'description': '24/7 mental health support',
                'available': '24/7',
                'link': 'tel:90101'
            }
        ],
        'online_resources': []
    },
    'NO': {  # Norway
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Mental Helse',
                'number': '116 123',
                'description': '24/7 mental health support',
                'available': '24/7',
                'link': 'tel:116123'
            }
        ],
        'online_resources': []
    },
    'DK': {  # Denmark
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Livslinien',
                'number': '70 201 201',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:70201201'
            }
        ],
        'online_resources': []
    },
    'FI': {  # Finland
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Crisis Helpline',
                'number': '09 2525 0111',
                'description': '24/7 crisis support',
                'available': '24/7',
                'link': 'tel:0925250111'
            }
        ],
        'online_resources': []
    },
    'PL': {  # Poland
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Telefon Zaufania',
                'number': '116 123',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:116123'
            }
        ],
        'online_resources': []
    },
    'RU': {  # Russia
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Crisis Helpline',
                'number': '8-800-2000-122',
                'description': '24/7 crisis support',
                'available': '24/7',
                'link': 'tel:88002000122'
            }
        ],
        'online_resources': []
    },
    'GR': {  # Greece
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'Klimaka',
                'number': '1018',
                'description': '24/7 suicide prevention',
                'available': '24/7',
                'link': 'tel:1018'
            }
        ],
        'online_resources': []
    },
    'PT': {  # Portugal
        'emergency': '112',
        'hotlines': [
            {
                'name': 'Emergency Services',
                'number': '112',
                'description': 'For immediate life-threatening emergencies',
                'available': '24/7',
                'link': 'tel:112'
            },
            {
                'name': 'SOS Voz Amiga',
                'number': '213 544 545',
                'description': '24/7 emotional support',
                'available': '24/7',
                'link': 'tel:213544545'
            }
        ],
        'online_resources': []
    }
}

def get_crisis_resources(country_code: str = 'US'):
    """
    Get country-specific crisis resources.
    Falls back to US if country not found.
    """
    return CRISIS_RESOURCES.get(country_code.upper(), CRISIS_RESOURCES['US'])

def get_available_countries():
    """
    Get list of available countries with their codes.
    Sorted alphabetically by name.
    """
    return [
        {'code': 'AR', 'name': 'Argentina'},
        {'code': 'AU', 'name': 'Australia'},
        {'code': 'BE', 'name': 'Belgium'},
        {'code': 'BR', 'name': 'Brazil'},
        {'code': 'CA', 'name': 'Canada'},
        {'code': 'CN', 'name': 'China'},
        {'code': 'DK', 'name': 'Denmark'},
        {'code': 'EG', 'name': 'Egypt'},
        {'code': 'FI', 'name': 'Finland'},
        {'code': 'FR', 'name': 'France'},
        {'code': 'DE', 'name': 'Germany'},
        {'code': 'GR', 'name': 'Greece'},
        {'code': 'ID', 'name': 'Indonesia'},
        {'code': 'IN', 'name': 'India'},
        {'code': 'IE', 'name': 'Ireland'},
        {'code': 'IT', 'name': 'Italy'},
        {'code': 'JP', 'name': 'Japan'},
        {'code': 'KR', 'name': 'South Korea'},
        {'code': 'MY', 'name': 'Malaysia'},
        {'code': 'MX', 'name': 'Mexico'},
        {'code': 'NL', 'name': 'Netherlands'},
        {'code': 'NZ', 'name': 'New Zealand'},
        {'code': 'NG', 'name': 'Nigeria'},
        {'code': 'NO', 'name': 'Norway'},
        {'code': 'PK', 'name': 'Pakistan'},
        {'code': 'PH', 'name': 'Philippines'},
        {'code': 'PL', 'name': 'Poland'},
        {'code': 'PT', 'name': 'Portugal'},
        {'code': 'RU', 'name': 'Russia'},
        {'code': 'SA', 'name': 'Saudi Arabia'},
        {'code': 'SG', 'name': 'Singapore'},
        {'code': 'ZA', 'name': 'South Africa'},
        {'code': 'ES', 'name': 'Spain'},
        {'code': 'SE', 'name': 'Sweden'},
        {'code': 'CH', 'name': 'Switzerland'},
        {'code': 'TH', 'name': 'Thailand'},
        {'code': 'TR', 'name': 'Turkey'},
        {'code': 'AE', 'name': 'United Arab Emirates'},
        {'code': 'GB', 'name': 'United Kingdom'},
        {'code': 'US', 'name': 'United States'},
        {'code': 'VN', 'name': 'Vietnam'},
    ]

