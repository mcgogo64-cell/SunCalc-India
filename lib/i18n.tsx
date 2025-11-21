"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "en" | "hi";

interface Translations {
    title: string;
    subtitle: string;
    toggle: {
        quick: string;
        appliance: string;
    };
    quick: {
        state: string;
        bill: string;
        recommendation: string;
        marketPrice: string;
        subsidy: string;
        netCost: string;
        cta: string;
    };
    appliance: {
        add: string;
        powerLoad: string;
        capacity: string;
        approximate: string;
        cta: string;
        items: {
            fan: string;
            light: string;
            fridge: string;
            ac: string;
            pump: string;
        };
    };
    visualization: {
        title: string;
        subtitle: string;
        caption: string;
        green: string;
        warranty: string;
    };
    checklist: {
        title: string;
        subtitle: string;
        ready: string;
        chance: string;
        items: {
            aadhaar: string;
            bill: string;
            roof: string;
            bank: string;
        };
    };
    faq: {
        title: string;
        items: {
            q1: string; a1: string;
            q2: string; a2: string;
            q3: string; a3: string;
        };
    };
    footer: {
        rights: string;
    };
}

const translations: Record<Language, Translations> = {
    en: {
        title: "Solar Discovery Engine",
        subtitle: "Calculate your solar potential in seconds.",
        toggle: { quick: "Quick Estimator", appliance: "Appliance Builder" },
        quick: {
            state: "Select State",
            bill: "Monthly Electricity Bill",
            recommendation: "Recommended System",
            marketPrice: "Market Price (Approx)",
            subsidy: "PM Surya Ghar Subsidy",
            netCost: "Your Net Cost",
            cta: "Get Detailed Quote"
        },
        appliance: {
            add: "Add your appliances",
            powerLoad: "Power Load",
            capacity: "Solar System Capacity",
            approximate: "You need approximately",
            cta: "See Pricing",
            items: {
                fan: "Ceiling Fan",
                light: "LED Tube Light",
                fridge: "Refrigerator",
                ac: "AC (1.5 Ton)",
                pump: "Water Pump"
            }
        },
        visualization: {
            title: "See It In Action",
            subtitle: "Don't just guess. Visualize what a solar system can actually power in your home.",
            caption: "A {kw}kW system powers these zones simultaneously.",
            green: "Green Energy",
            warranty: "Warranty"
        },
        checklist: {
            title: "Get Subsidy Ready",
            subtitle: "The PM Surya Ghar scheme requires specific documents.",
            ready: "You are Ready to Apply!",
            chance: "Approval chances are high.",
            items: {
                aadhaar: "Aadhaar Card Linked to Mobile",
                bill: "Latest Electricity Bill",
                roof: "Roof Photo (Clear View)",
                bank: "Bank Account Details"
            }
        },
        faq: {
            title: "Frequently Asked Questions",
            items: {
                q1: "Will the subsidy come directly to my bank?", a1: "Yes, under the PM Surya Ghar scheme, the subsidy is transferred directly to your Aadhaar-linked bank account.",
                q2: "How much roof space do I need?", a2: "Typically, 1 kW requires about 100 sq. ft. of shadow-free roof area.",
                q3: "What is the warranty on solar panels?", a3: "Most Tier-1 solar panels come with a 25-year performance warranty."
            }
        },
        footer: { rights: "All rights reserved." }
    },
    hi: {
        title: "सौर खोज इंजन",
        subtitle: "सेकंड में अपनी सौर क्षमता की गणना करें।",
        toggle: { quick: "त्वरित अनुमान", appliance: "उपकरण कैलकुलेटर" },
        quick: {
            state: "राज्य चुनें",
            bill: "मासिक बिजली बिल",
            recommendation: "अनुशंसित सिस्टम",
            marketPrice: "बाजार मूल्य (अनुमानित)",
            subsidy: "पीएम सूर्य घर सब्सिडी",
            netCost: "आपकी शुद्ध लागत",
            cta: "विस्तृत कोट प्राप्त करें"
        },
        appliance: {
            add: "अपने उपकरण जोड़ें",
            powerLoad: "बिजली का भार",
            capacity: "सौर प्रणाली क्षमता",
            approximate: "आपको लगभग आवश्यकता है",
            cta: "कीमत देखें",
            items: {
                fan: "छत का पंखा",
                light: "एलईडी ट्यूब लाइट",
                fridge: "फ्रिज",
                ac: "एसी (1.5 टन)",
                pump: "पानी की मोटर"
            }
        },
        visualization: {
            title: "इसे काम करते हुए देखें",
            subtitle: "बस अनुमान न लगाएं। देखें कि सौर प्रणाली वास्तव में आपके घर में क्या चला सकती है।",
            caption: "एक {kw}kW सिस्टम इन क्षेत्रों को एक साथ चलाता है।",
            green: "हरित ऊर्जा",
            warranty: "वारंटी"
        },
        checklist: {
            title: "सब्सिडी के लिए तैयार हो जाएं",
            subtitle: "पीएम सूर्य घर योजना के लिए विशिष्ट दस्तावेजों की आवश्यकता होती है।",
            ready: "आप आवेदन करने के लिए तैयार हैं!",
            chance: "मंजूरी की संभावना अधिक है।",
            items: {
                aadhaar: "मोबाइल से लिंक आधार कार्ड",
                bill: "नवीनतम बिजली बिल",
                roof: "छत की फोटो (साफ दृश्य)",
                bank: "बैंक खाता विवरण"
            }
        },
        faq: {
            title: "अक्सर पूछे जाने वाले प्रश्न",
            items: {
                q1: "क्या सब्सिडी सीधे मेरे बैंक में आएगी?", a1: "हां, पीएम सूर्य घर योजना के तहत, सब्सिडी सीधे आपके आधार से जुड़े बैंक खाते में स्थानांतरित की जाती है।",
                q2: "मुझे कितनी छत की जगह चाहिए?", a2: "आमतौर पर, 1 किलोवाट के लिए लगभग 100 वर्ग फुट छाया-मुक्त छत क्षेत्र की आवश्यकता होती है।",
                q3: "सौर पैनलों पर वारंटी क्या है?", a3: "अधिकांश टियर-1 सौर पैनल 25 साल की प्रदर्शन वारंटी के साथ आते हैं।"
            }
        },
        footer: { rights: "सर्वाधिकार सुरक्षित।" }
    }
};

const LanguageContext = createContext<{
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}>({
    language: "hi",
    setLanguage: () => { },
    t: translations.hi
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("hi");

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
