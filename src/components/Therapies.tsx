import React, { useState, useEffect } from 'react';
// @ts-ignore
import ScrollReveal from './ScrollReveal';

// --- Types ---
interface Treatment {
  id: string;
  name: string;
  shortDescription: string;
  icon: string;
  color: string;
  image: string;
  details: string[];
  malayalamDetails: string[];
}

// --- Data Configuration ---
const treatments: Treatment[] = [
  // 1. Shirodhara
  {
    id: 'shirodhara',
    name: 'Shirodhara (ശിരോധാര)',
    shortDescription: 'Reduce Stress & Anxiety',
    icon: 'ri:drop-fill',
    color: 'text-purple-400',
    image: '/assets/treatments/shirodhara.svg',
    details: [
      'Reduce stress and anxiety.',
      'Improves memory.',
      'Provides firmness to the body.',
      'Enhances the quality of sleep.',
      'Controls mood swings and depression.',
      'Reduce hair fall and nourishes the scalp.'
    ],
    malayalamDetails: [
      'ഉത്കണ്ഠയും സമ്മര്‍ദ്ദവും കുറയ്ക്കുന്നു.',
      'ഓര്‍മ്മക്കുറവിന് ആശ്വാസം നൽകുന്നു.',
      'ശരീരത്തിന്‍റെ ദൃഢത നിലനിർത്തുന്നു.',
      'ഉറക്കമില്ലായ്മക്കുള്ള പരിഹാരം.',
      'വിഷാദ രോഗത്തിൽനിന്ന് ആശ്വാസം ലഭിക്കുന്നു.',
      'മുടികൊഴിച്ചിൽ തടയുകയും തലയോട്ടിയെ സംരക്ഷിക്കുകയും ചെയ്യുന്നു.'
    ]
  },
  // 2. Abhyanga
  {
    id: 'abhyanga',
    name: 'Abhyanga (അഭ്യംഗം)',
    shortDescription: 'Calming for the Nerves',
    icon: 'solar:hand-stars-bold-duotone',
    color: 'text-amber-400',
    image: '/assets/treatments/abhyanga.svg',
    details: [
      'Calming for the Nerves.',
      'Increased mental alertness.',
      'Improves sleep.',
      'Improves skin tone.',
      'Helps to Digestion.',
      'It improves Elimination of impurities from the body.',
      'Increased blood circulation especially to nerve.',
      'Anti aging Keeps body looking healthy.',
      'Lubrication of the joints.'
    ],
    malayalamDetails: [
      'ഞരമ്പുകൾക്ക് ശക്തി നൽകുന്നു.',
      'മാനസിക ജാഗ്രത വർദ്ധിപ്പിക്കുന്നു.',
      'ഉറക്കം മെച്ചപ്പെടുത്തുന്നു.',
      'ചർമ്മത്തിന്റെ നിറം മെച്ചപ്പെടുത്തുന്നു.',
      'ദഹനത്തിന് സഹായിക്കുന്നു.',
      'ശരീരത്തിലെ മാലിന്യങ്ങളെ നീക്കം ചെയ്യാൻ സഹായിക്കുന്നു.',
      'വാർദ്ധക്യം തടയുന്നു.',
      'സന്ധികളുടെ ചലനം മെച്ചപ്പെടുത്തുന്നു.'
    ]
  },
  // 3. Navara Kizhi (Filename typo: 'navara jizhi')
  {
    id: 'navara-kizhi',
    name: 'Navara Kizhi (നവര കിഴി)',
    shortDescription: 'Rejuvenate the tissues',
    icon: 'solar:bone-bold-duotone',
    color: 'text-orange-400',
    image: '/assets/treatments/navara%20jizhi.svg',
    details: [
      'Provides strength and rejuvenate the tissues.',
      'Relief from pain, inflamation and stiffness.',
      'Improves blood circulation.',
      'Releases toxins from the body.',
      'Ideal treatment for rheumatoid arthritis lower back pain.',
      'Improves flexibility.',
      'Improves skin texture.'
    ],
    malayalamDetails: [
      'സന്ധികളുടെ വഴക്കവും ചലനവും മെച്ചപ്പെടുത്തുന്നു.',
      'ചർമ്മത്തിലെ രക്തചംക്രമണം മെച്ചപ്പെടുത്തുന്നതിലൂടെ ചർമ്മത്തിന്‍റെ നിറം വർദ്ധിപ്പിക്കുന്നു.',
      'സെർവിക്കൽ സ്പോണ്ടിലോസിസ്, നടുവേദന, പക്ഷാഘാതം തുടങ്ങിയ വേദനകൾ കുറയ്ക്കുന്നു.',
      'ശരീരത്തിലെ വിഷാംശം കുറയ്ക്കുന്നു.'
    ]
  },
  // 4. Elakizhi
  {
    id: 'elakizhi',
    name: 'Elakizhi (ഇലക്കിഴി)',
    shortDescription: 'Relieves body pain & stiffness',
    icon: 'solar:leaf-bold-duotone',
    color: 'text-lime-400',
    image: '/assets/treatments/elakizhi.svg',
    details: [
      'Relieves body pain and stiffnes.',
      'Remove dryness of the skin.',
      'Relaxing and detoxing.',
      'Effective for patient with slipped disc pain and other sports injury.',
      'Slow downs the process of aging.',
      'Effective for arthritis, spondylitis and paralysis.',
      'Helps improving muscle strength.'
    ],
    malayalamDetails: [
      'സന്ധിവേദന, സ്പോണ്ടിലോസിസ്, നടുവേദന, സ്പോർട്സ് പരിക്കുകൾ എന്നിവയ്ക്ക് ഉത്തമം.',
      'ശരീരത്തിലെ വരൾച്ച ഇല്ലാതാക്കുന്നു.',
      'ശരീരത്തിന് ഉന്മേഷം നൽകുന്നു.'
    ]
  },
  // 5. Shirovasti
  {
    id: 'shirovasti',
    name: 'Shirovasti (ശിരോവസ്തി)',
    shortDescription: 'Balance Vata and Kapha',
    icon: 'ph:head-circuit-duotone',
    color: 'text-blue-400',
    image: '/assets/treatments/shirovasti.svg',
    details: [
      'Indicated in paralysis.',
      'Reduces anxiety and stress.',
      'Improves skin complexion.',
      'Calming the nerve endings.',
      'Balance the vata and kapha.',
      'Nourishes the hair roots and makes the hair soft and silky.'
    ],
    malayalamDetails: [
      'പക്ഷാഘാതം തടയുന്നു.',
      'സമ്മര്‍ദ്ദം, ഉത്കണ്ഠ, ടെൻഷൻ കുറയ്ക്കുന്നു.',
      'നാഡീ ഞരമ്പുകൾക്ക് ഉത്തേജനം നൽകുന്നു.',
      'വാതാദി ദോഷങ്ങളെ നിയന്ത്രിക്കുന്നു.',
      'മുടിവളർച്ച ത്വരിതപ്പെടുത്തുന്നു.'
    ]
  },
  // 6. Thala Pothichil
  {
    id: 'thala-pothichil',
    name: 'Thala Pothichil (തല പൊതിച്ചിൽ)',
    shortDescription: 'Stabilize nervous system',
    icon: 'solar:sleeping-bold-duotone',
    color: 'text-indigo-400',
    image: '/assets/treatments/thala%20pothichil.svg',
    details: [
      'Improves quality of sleep.',
      'Stabilize the nervous system.',
      'Improves lustre & smoothness of hair.',
      'Activate the vital area.',
      'Relieves stress tension heaviness of the head.'
    ],
    malayalamDetails: [
      'ഉറക്കമില്ലായ്മയ്ക്ക് ഉത്തമം.',
      'നാഡീ ഞരമ്പുകൾക്ക് ശക്തി ലഭിക്കുന്നു.',
      'ദഹനശക്തി വർദ്ധിപ്പിക്കുന്നു.',
      'മാനസിക പിരിമുറുക്കം കുറയ്ക്കുന്നു.',
      'മുടികൊഴിച്ചിൽ തടയുന്നു.'
    ]
  },
  // 7. Karnapooranam
  {
    id: 'karnapooranam',
    name: 'Karnapooranam (കർണ്ണ പൂരണം)',
    shortDescription: 'Ear care & cleansing',
    icon: 'lucide:ear',
    color: 'text-pink-400',
    image: '/assets/treatments/karna%20pooranam.svg',
    details: [
      'Relieves earache.',
      'Cleanses ear canal.',
      'Improves hearing.',
      'Prevent neck stifiness.',
      'Removes all ear wax and dirt.',
      'Strengthens surrounding nerves.',
      'Strengthens the bones in the ear.'
    ],
    malayalamDetails: [
      'ചെവി വേദനയ്ക്ക് ഉത്തമം.',
      'കേൾവിശക്തി വർദ്ധിപ്പിക്കുന്നു.',
      'നാഡിഞരമ്പുകൾക്ക് ശക്തി നൽകുന്നു.',
      'ചെവിയിലെ അണുബാധ തടയുന്നു.'
    ]
  },
  // 8. Udwarthanam
  {
    id: 'udwarthanam',
    name: 'Udwarthanam (ഉദ്വർത്തനം)',
    shortDescription: 'Weight & fat reduction',
    icon: 'solar:body-bold-duotone',
    color: 'text-rose-400',
    image: '/assets/treatments/udwarthanam.svg',
    details: [
      'Reduce excess fat.',
      'Helps in weight reduction.',
      'Reduce blood cholesterol.',
      'Improves mobility of joints.',
      'Reduces water retention and swelling.',
      'Removes toxins from the body.',
      'Improves complexion.'
    ],
    malayalamDetails: [
      'അധിക കൊഴുപ്പിനെ ഇല്ലാതാക്കുന്നു.',
      'ശരീര ഭാരം കുറയ്ക്കുന്നു.',
      'കൊളസ്ട്രോൾ കുറയ്ക്കുന്നു.',
      'ജോയിന്റ് മൊബിലിറ്റി കൂട്ടുന്നു.',
      'ചർമ്മത്തിൽ നിന്ന് വിഷ വസ്തുക്കളെ നീക്കം ചെയ്യുന്നു.',
      'ചർമ്മത്തിന് നിറം വർദ്ധിപ്പിക്കുന്നു.'
    ]
  },
  // 9. Pizhichil
  {
    id: 'pizhichil',
    name: 'Pizhichil (പിഴിച്ചിൽ)',
    shortDescription: 'Treats rheumatic diseases',
    icon: 'solar:waterdrops-bold-duotone',
    color: 'text-cyan-400',
    image: '/assets/treatments/pizhichil.svg',
    details: [
      'Relives fatigue.',
      'Rejuvenates the skin.',
      'Eliminates the vata disorders.',
      'Eliminates nervous disorders.',
      'Reduces nerve weakness.',
      'Cure sexual weakness.',
      'Manage stress disorders.',
      'Treats paralysis, Arthritis, Rheumatic disease.'
    ],
    malayalamDetails: [
      'ശരീര ക്ഷീണം കുറയ്ക്കുന്നു.',
      'യുവത്വം നിലനിർത്തുന്നു.',
      'ശരീര വേദന വീക്കം കുറയ്ക്കുന്നു.',
      'സന്ധുവാതം, പക്ഷാഘാതം, പാർക്കിൻസൺസ് രോഗം എന്നിവ കുറയ്ക്കുന്നു.'
    ]
  },
  // 10. Nasyam
  {
    id: 'nasyam',
    name: 'Nasyam (നസ്യം)',
    shortDescription: 'Clear mucous blockages',
    icon: 'healthicons:nose',
    color: 'text-emerald-400',
    image: '/assets/treatments/nasyam.svg',
    details: [
      'Clear mucous blockages.',
      'Opens blocked channels.',
      'Treats nasal infection.',
      'Remedy for congestion.',
      'Treats allergic & sinusitis, headache & hair fall.',
      'Relieve migraine.'
    ],
    malayalamDetails: [
      'ശ്വാസകോശ രോഗങ്ങൾക്ക് ഉത്തമം.',
      'കഴുത്ത് വേദന, തരിപ്പ്, തുടങ്ങിയ അസുഖങ്ങൾക്ക് ഉത്തമം.',
      'മുടികൊഴിച്ചിൽ, അകാലനര അകറ്റുന്നു.',
      'തലവേദന, മൈഗ്രെയ്ൻ, തുടങ്ങിയ രോഗങ്ങൾ ഇല്ലാതായാക്കുന്നു.'
    ]
  },
  // 11. Ksheera Dhara
  {
    id: 'ksheera-dhara',
    name: 'Ksheera Dhara (ക്ഷീരധാര)',
    shortDescription: 'Relax body & mind',
    icon: 'solar:sun-fog-bold-duotone',
    color: 'text-yellow-400',
    image: '/assets/treatments/ksheera%20dhara.svg',
    details: [
      'Relieves from fatigue',
      'Boost memory power',
      'Relieves from stress',
      'Relieves insomnia',
      'Boost skin glow',
      'Relax body & mind'
    ],
    malayalamDetails: [
      'സമ്മര്‍ദ്ദം, ഉത്കണ്ഠ, എന്നിവ കുറയ്ക്കുന്നു',
      'ചർമ്മത്തിനും മുടി സംരക്ഷണത്തിനും ഉത്തമം',
      'ഓര്‍മ്മശക്തി വർദ്ധിപ്പിക്കുന്നു',
      'ശരീര ക്ഷീണം അകറ്റുന്നു'
    ]
  },
  // 12. Takra Dhara
  {
    id: 'takra-dhara',
    name: 'Takra Dhara (തക്രധാര)',
    shortDescription: 'Calms the nervous system',
    icon: 'solar:meditation-round-bold-duotone',
    color: 'text-teal-400',
    image: '/assets/treatments/takra%20dhara.svg',
    details: [
      'Helps over come stress & calms the nervous system',
      'Relieves insomnia, anxiety and chronic headaches',
      'Increase digestive power',
      'Prevents greying of the hair'
    ],
    malayalamDetails: [
      'തലച്ചോറിലേക്കുള്ള രക്തയോട്ടം മെച്ചപ്പെടുത്തുന്നു',
      'മാനസിക സമ്മര്‍ദ്ദം, തലവേദന, ഉറക്കക്കുറവ്, മുടികൊഴിച്ചിൽ, മുടി നരക്കൽ എന്നിവ കുറയ്ക്കുന്നു',
      'ദഹന ശക്തി മെച്ചപ്പെടുത്തുന്നു'
    ]
  },
  // 13. Kashaya Dhara
  {
    id: 'kashaya-dhara',
    name: 'Kashaya Dhara (കഷായ ധാര)',
    shortDescription: 'Improves circulation',
    icon: 'solar:heart-pulse-bold-duotone',
    color: 'text-red-400',
    image: '/assets/treatments/kashaya%20dhara.svg',
    details: [
      'Improves circulation to the skin',
      'Reduce skin inflamation, pain & stifness',
      'Helps to reduce itching sensation all over body',
      'Reduce skin dryness',
      'Helps to heal the wounds',
      'Act as anti bacterial therapy',
      'Prevent degeneration of joint & soft tissues'
    ],
    malayalamDetails: [
      'ശരീരത്തെ പുനരുജ്ജീവിപ്പിക്കുകയും ഊർജ്ജസ്വലമാക്കുകയും ചെയ്യുന്നു',
      'സന്ധി വാതവുമായി ബന്ധപ്പെട്ട വേദന, വീക്കം, നീർക്കെട്ട് എന്നിവ കുറയ്ക്കുന്നു',
      'പ്രസവാനന്തര ക്ഷീണം, വേദന കുറയ്ക്കുന്നു',
      'ചൊറിച്ചിൽ, തൊലിപ്പുറത്തുണ്ടാകുന്ന അസുഖങ്ങൾ കുറയ്ക്കുന്നു'
    ]
  },
  // 14. Mukh Lepam
  {
    id: 'mukh-lepam',
    name: 'Mukh Lepam (മുഖ ലേപം)',
    shortDescription: 'Exfoliate & nourish skin',
    icon: 'lucide:sparkles',
    color: 'text-fuchsia-400',
    image: '/assets/treatments/mukh%20lepam.svg',
    details: [
      'Exfoliate the skin',
      'Clear the debris',
      'Provide fresh nutrition to the skin',
      'Opens clogged pores',
      'Prevent pigmentation',
      'Prevent aging of skin'
    ],
    malayalamDetails: [
      'ചർമ്മ കോശങ്ങളെ പുനരുജ്ജീവിപ്പിക്കുന്നു',
      'ചർമ്മത്തിന്‍റെ ഇലാസ്തികത വർദ്ധിപ്പിക്കുന്നു',
      'ചുളിവുകൾ കുറയ്ക്കുന്നു',
      'പിഗ്മെന്റേഷൻ തടയുന്നു',
      'മുഖക്കുരു, കരുവാലിപ്പ്, കുറയ്ക്കുന്നു'
    ]
  },
  // 15. Rejuvenation Massage
  {
    id: 'rejuvenation-massage',
    name: 'Rejuvenation Massage',
    shortDescription: 'Revitalize body & mind',
    icon: 'mdi:spa',
    color: 'text-violet-400',
    image: '/assets/treatments/rejuvenation.svg',
    details: [
      'It helps alleviate tension and stress to our bodies',
      'Improves circulation',
      'Reduce anxiety',
      'Promote mental alertness',
      'Enhance sexual activity',
      'Improves posture',
      'Balances your blood pressure'
    ],
    malayalamDetails: [
      'മാനസിക സമ്മര്‍ദ്ദം കുറയ്ക്കുന്നു',
      'രക്തയോട്ടം വർദ്ധിപ്പിക്കുന്നു',
      'രക്തസമ്മര്‍ദ്ദം കുറയ്ക്കുന്നു',
      'ഉറക്കം മെച്ചപ്പെടുത്തുന്നു'
    ]
  },
  // 16. Shiropichu
  {
    id: 'shiropichu',
    name: 'Shiropichu (ശിരോപിച്ചു)',
    shortDescription: 'Scalp & migraine relief',
    icon: 'lucide:snowflake',
    color: 'text-sky-400',
    image: '/assets/treatments/shiropichu.svg',
    details: [
      'Reduces the burning sensation in the scalp',
      'Prevents hair fall, split hair and premature greying',
      'Relieves headache and migraine',
      'Induces sleep',
      'Improves memory',
      'Decrease stiffness in the neck and eye strain',
      'Neurological disorder like paralysis and facial palsy'
    ],
    malayalamDetails: [
      'മുടികൊഴിച്ചിൽ, മുടി പിളരൽ, അകാല നര എന്നിവ തടയുന്നു',
      'തലവേദന, മൈഗ്രെയ്ൻ കുറയ്ക്കുന്നു',
      'ഉറക്കമില്ലായ്മ, കുറയ്ക്കുന്നു',
      'നാഡീ ഞരമ്പുകൾക്ക് ശക്തി നൽകുന്നു',
      'ഓര്‍മ്മശക്തി കൂട്ടുന്നു'
    ]
  },
  // 17. Kati Vasti
  {
    id: 'kati-vasti',
    name: 'Kati Vasti (കടി വസ്തി)',
    shortDescription: 'Low back muscle care',
    icon: 'icon-park-twotone:muscle',
    color: 'text-orange-500',
    image: '/assets/treatments/kati%20vasti.svg',
    details: [
      'Strengthening the low back muscles',
      'Increase blood supply for lumbar muscles',
      'Nourishes lumbar and sacral vertebrae',
      'Increase the nerve supply to the lower limbs',
      'Stimulate the nerves, relieving pain and numbness',
      'Reduce pain and inflammation'
    ],
    malayalamDetails: [
      'പേശികളുടെ ശക്തി വർദ്ധിപ്പിക്കുകയും നാഡികൾ വഴുവഴുപ്പുള്ളതായും നിലനിർത്തുന്നു',
      'നടുവേദന കുറയ്ക്കുന്നു',
      'സ്ലിപ്പ് ഡിസ്ക്, ലംബർ സ്പോണ്ടിലോസിസ് സയറ്റിക്ക, സുഷുമ്നാ നാഡി പ്രശ്നങ്ങൾക്ക് ഉത്തമം'
    ]
  },
  // 18. Janu Vasti
  {
    id: 'janu-vasti',
    name: 'Janu Vasti (ജാനു വസ്തി)',
    shortDescription: 'Knee joint care',
    icon: 'solar:walking-round-bold-duotone',
    color: 'text-green-500',
    image: '/assets/treatments/janu%20vasti.svg',
    details: [
      'Relief of knee joint pain',
      'Helps alleviate osteo arthritis of the knee joint',
      'Removes stiffness and pain in knee joint',
      'Protects knee joints from age related changes'
    ],
    malayalamDetails: [
      'കാൽമുട്ട് ജോയിന്റ് ഏരിയയിൽ നിന്ന് കാഠിന്യവും വേദനയും ഇല്ലാതാക്കുന്നു',
      'കാൽമുട്ട് വേദനയ്ക്ക് ആശ്വാസം ലഭിക്കുന്നു',
      'രക്തയോട്ടം വർദ്ധിപ്പിക്കുന്നു',
      'ഓസ്റ്റിയോ ആർത്രൈറ്റിസ്, ഓസ്റ്റിയോ പോറോസിസ് തുടങ്ങിയ രോഗങ്ങൾക്ക് ഉത്തമം'
    ]
  },
  // 19. Upanaha Sweda (Filename typo: 'swda')
  {
    id: 'upanaha-sweda',
    name: 'Upanaha Sweda (ഉപനഹ സ്വേദനം)',
    shortDescription: 'Pain & swelling relief',
    icon: 'lucide:bandage',
    color: 'text-amber-500',
    image: '/assets/treatments/upanaha%20swda.svg',
    details: [
      'Relieves pain, swelling & nourishes the tissues',
      'Reduces the inflammation of the joints',
      'It act as muscle relaxant',
      'Increase the blood circulation',
      'Helps to reduces the crepitus of the joint'
    ],
    malayalamDetails: [
      'വേദന, വീക്കം കുറയ്ക്കുന്നു',
      'മസിൽ റിലാക്സന്റായി പ്രവർത്തിക്കുന്നു',
      'രക്തയോട്ടം വർദ്ധിപ്പിക്കുന്നു',
      'സന്ധികളുടെ ക്രെപിറ്റസ് കുറയ്ക്കുന്നു'
    ]
  },
  // 20. Avagaha Sweda
  {
    id: 'avagaha-sweda',
    name: 'Avagaha Sweda (അവഗാഹ സ്വേദനം)',
    shortDescription: 'Vata related issues',
    icon: 'solar:bath-bold-duotone',
    color: 'text-blue-500',
    image: '/assets/treatments/avagaha%20sweda.svg',
    details: [
      'Warm water is regularly replenished to maintain the temperature.',
      'Commonly prescribed for the treatment of Vata related issues.',
      'Highly recomended for patients suffering from Rheumatism, Hernia and other related diseases.'
    ],
    malayalamDetails: [
      'വാത സംബന്ധമായ രോഗങ്ങളുടെ ചികിത്സയ്ക്കായി അവഗാഹ സ്വേദനം നിർദ്ദേശിക്കപ്പെടുന്നു'
    ]
  },
  // 21. Matra Vasti
  {
    id: 'matra-vasti',
    name: 'Matra Vasti (മാത്ര വസ്‌തി)',
    shortDescription: 'Therapeutic Enema',
    icon: 'solar:syringe-bold-duotone',
    color: 'text-indigo-500',
    image: '/assets/treatments/matra%20vasti.svg',
    details: [
      'Best treatmet for vata vyadhies',
      'Medicated oil is administered through the anus.',
      'Treats Neurological ailments, Paralysis, Lower backache, Gout and Rheumatism'
    ],
    malayalamDetails: [
      'ഔഷധ എണ്ണ മലദ്വാരത്തിലൂടെയാണ് നൽകുന്നത്',
      'നാഡീ സംബന്ധമായ അസുഖങ്ങൾ, പക്ഷാഘാതം, സന്ധുവാതം, ആർത്രൈറ്റിസ് മുതലായ രോഗങ്ങൾക്ക് ഉത്തമം'
    ]
  },
  // 22. Tarpanam
  {
    id: 'tarpanam',
    name: 'Tarpanam (തർപ്പണം)',
    shortDescription: 'Eye care therapy',
    icon: 'solar:eye-bold-duotone',
    color: 'text-cyan-500',
    image: '/assets/treatments/tarpanam.svg',
    details: [
      'Improves the vision',
      'Removes dark circles under the eyes',
      'Strengthen the nerves and muscles of the eyes',
      'Prevents formation of cataract'
    ],
    malayalamDetails: [
      'കാഴ്ചശക്തി കൂട്ടുന്നു',
      'തിമിരം തടയുന്നു',
      'കണ്ണിന് ചുറ്റുമുണ്ടാകുന്ന കരിവാളിപ്പ് അകറ്റുന്നു',
      'കണ്ണിന് ഇടവിട്ട് വരുന്ന ചൊറിച്ചിൽ, വേദന, ചുവപ്പ് തുടങ്ങിയ രോഗങ്ങൾക്ക് ഉത്തമം'
    ]
  },
  // 23. Netra Dhara (Filename: 'netra_dhara')
  {
    id: 'netra-dhara',
    name: 'Netra Dhara (നേത്രധാര)',
    shortDescription: 'Eye stress relief',
    icon: 'solar:eye-closed-bold-duotone',
    color: 'text-emerald-500',
    image: '/assets/treatments/netra_dhara.svg',
    details: [
      'Reduce stress and anxiety.',
      'Improves memory.',
      'Provides firmness to the body.',
      'Enhances the quality of sleep.',
      'Controls mood swings and depression.'
    ],
    malayalamDetails: [
      'ഉത്കണ്ഠയും സമ്മര്‍ദ്ദവും കുറയ്ക്കുന്നു.',
      'ഓര്‍മ്മക്കുറവിന് ആശ്വാസം നൽകുന്നു.',
      'ശരീരത്തിന്‍റെ ദൃഢത നിലനിർത്തുന്നു.',
      'ഉറക്കമില്ലായ്മക്കുള്ള പരിഹാരം.'
    ]
  },
  // 24. Leech Therapy (Filename: 'leach_therapy')
  {
    id: 'leech-therapy',
    name: 'Leech Therapy (ലീച്ച് തെറാപ്പി)',
    shortDescription: 'Blood purification',
    icon: 'solar:adhesive-plaster-bold-duotone',
    color: 'text-red-500',
    image: '/assets/treatments/leach_therapy.svg',
    details: [
      'Diabetic foot ulcer',
      'For skin problems',
      'Improves blood circulation',
      'Improves metabolism',
      'It is helpful for Hemorrhoids',
      'Its good for vericose vein',
      'Treating alopecia and baldness'
    ],
    malayalamDetails: [
      'പ്രമേഹ രോഗികളുടെ വ്രണ ചികിത്സയിൽ വളരെ ഫലപ്രദമായി കാണുന്നു',
      'തൊലി പുറത്തുള്ള രോഗങ്ങളെ സുഖപ്പെടുത്തുന്നു',
      'രക്തയോട്ടം വർദ്ധിപ്പിക്കുന്നു',
      'വെരിക്കോസ് വെയിന്‍, വ്രണം സുഖപ്പെടുത്തുന്നു'
    ]
  },
  // 25. Prasava Raksha (Filename: 'prasava_raksha')
  {
    id: 'prasava-raksha',
    name: 'Prasava Raksha (പ്രസവ രക്ഷ)',
    shortDescription: 'Post-natal Care Packages',
    icon: 'solar:user-heart-bold-duotone',
    color: 'text-pink-500',
    image: '/assets/treatments/prasava_raksha.svg',
    details: [
      'Ved Bath & Ved Kizhi',
      'Lepanas for stretch marks',
      'Abdomen reducing excercise',
      'Fumigation of hair',
      'Special diet plans to increase breast milk',
      'Baby massage & Abdominal binding'
    ],
    malayalamDetails: [
      '7 Days, 14 Days, 21 Days, 28 Days Packages available',
      'Includes Stress free packages (Shirodhara & Kashaya dhara)'
    ]
  }
];

const Therapies: React.FC = () => {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  // Lock body scroll when canvas is open
  useEffect(() => {
    if (selectedTreatment) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTreatment]);

  return (
    <section id="therapies" className="py-24 bg-[#050507] border-t border-white/5 relative overflow-hidden">
      {/* Import Manjari Font for Malayalam */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manjari:wght@100;400;700&display=swap');
        `}
      </style>

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none accent-glow-purple"></div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-purple-400 text-xs font-bold tracking-widest uppercase font-inter-tight">Our Specialities</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 font-inter-tight">Therapeutic Treatments</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-light">
              Ancient Ayurvedic therapies curated to heal, rejuvenate, and restore your body's vital energy.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((item, idx) => (
            <ScrollReveal key={item.id} delay={`delay-${(idx % 3) * 100}`}>
              <div
                onClick={() => setSelectedTreatment(item)}
                className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute top-0 right-0 p-20 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color.replace('text-', 'from-')} to-transparent rounded-full blur-2xl transition-opacity duration-500`}></div>

                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                   {/* @ts-ignore */}
                   <iconify-icon icon={item.icon}></iconify-icon>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 font-inter-tight">
                    {item.name.split('(')[0]} 
                    <span style={{ fontFamily: "'Manjari', sans-serif" }} className="text-sm opacity-80 font-normal ml-1">
                        ({item.name.split('(')[1]}
                    </span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{item.shortDescription}</p>
                <div className="mt-6 flex items-center text-xs font-medium text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-wider">
                  View Details <span className="ml-2 text-lg">→</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* --- Details Canvas/Drawer --- */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedTreatment(null)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#0a0a0c] h-full border-l border-white/10 shadow-2xl overflow-y-auto animate-slide-in-right flex flex-col">
            
            {/* HERO IMAGE SECTION
               Taking up ~45% of the drawer height with the curved image at the top 
            */}
            <div className="relative w-full h-[45vh] shrink-0 bg-[#0a0a0c]">
                {/* Close Button - Floating */}
                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10 transition-all z-50 cursor-pointer"
                >
                  {/* @ts-ignore */}
                  <iconify-icon icon="mingcute:close-line" width="24" height="24"></iconify-icon>
                </button>

                {/* The Curved Image */}
                <div className="w-full h-full relative flex items-start justify-center overflow-hidden">
                  <img 
                    src={selectedTreatment.image} 
                    alt={selectedTreatment.name} 
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient Overlay at bottom to blend into text section (optional, remove if image handles it) */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none"></div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="flex-1 p-8 -mt-6 relative bg-[#0a0a0c]">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="sacred-grid"></div>
                <div className="herbal-particles"></div>
                <div className="breathing-glow"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 font-inter-tight leading-tight">
                    {selectedTreatment.name.split('(')[0]}
                    <br/>
                    <span style={{ fontFamily: "'Manjari', sans-serif" }} className="text-xl opacity-90 font-normal text-gray-400">
                        ({selectedTreatment.name.split('(')[1]}
                    </span>
                </h2>
                
                <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${selectedTreatment.color}`}>
                  {selectedTreatment.shortDescription}
                </p>

                {/* Decorative Leaf Icon matching your design */}
                <div className={`mb-6 ${selectedTreatment.color} opacity-80`}>
                   {/* @ts-ignore */}
                  <iconify-icon icon="solar:leaf-bold-duotone" width="20"></iconify-icon>
                </div>

                <div className="space-y-8">
                  {/* English Section */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                      Benefits & Indications
                    </h4>
                    <ul className="space-y-3">
                      {selectedTreatment.details.map((point, i) => (
                        <li key={i} className="flex items-start text-gray-300 font-light leading-relaxed text-sm">
                          <span className="mt-1.5 mr-3 w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Malayalam Section */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                      Malayalam Details
                    </h4>
                    <ul className="space-y-3">
                      {selectedTreatment.malayalamDetails.map((point, i) => (
                        <li 
                          key={i} 
                          className="flex items-start text-gray-300 font-light leading-relaxed text-sm"
                          style={{ fontFamily: "'Manjari', sans-serif" }}
                        >
                          <span className="mt-2 mr-3 w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 pb-8">
                  <button
                      onClick={() => setSelectedTreatment(null)}
                      className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all border border-white/5"
                  >
                      Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Therapies;