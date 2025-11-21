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
        pricingCta?: string;
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
    pricingModal?: {
        title: string;
        systemSize: string;
        approxCost: string;
        note: string;
        gotIt: string;
        close: string;
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
            cta: "Get Detailed Quote",
            pricingCta: "See Pricing"
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
        pricingModal: {
            title: "Pricing Preview",
            systemSize: "System Size",
            approxCost: "Approx. Cost (Turnkey)",
            note: "Prices are indicative for standard rooftop installs. Final quote may vary by panels, inverter brand, and structure complexity. Subsidy (PM Surya Ghar + state, if available) will further reduce this.",
            gotIt: "Got it",
            close: "Close"
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
        title: "सोलर डिस्कवरी इंजन",
        subtitle: "कुछ ही सेकंड में अपना सोलर पोटेंशियल जानें।",
        toggle: { quick: "त्वरित अनुमान", appliance: "उपकरण कैलकुलेटर" },
        quick: {
            state: "राज्य चुनें",
            bill: "मासिक बिजली बिल",
            recommendation: "अनुशंसित सिस्टम",
            marketPrice: "बाज़ार मूल्य (अनुमानित)",
            subsidy: "पीएम सूर्य घर सब्सिडी",
            netCost: "आपकी शुद्ध लागत",
            cta: "विस्तृत कोट प्राप्त करें",
            pricingCta: "कीमत देखें"
        },
        appliance: {
            add: "अपने उपकरण जोड़ें",
            powerLoad: "पावर लोड",
            capacity: "सोलर सिस्टम क्षमता",
            approximate: "आपको लगभग",
            cta: "कीमत देखें",
            items: {
                fan: "सीलिंग फैन",
                light: "एलईडी ट्यूब लाइट",
                fridge: "फ्रिज",
                ac: "एसी (1.5 टन)",
                pump: "वॉटर पंप"
            }
        },
        pricingModal: {
            title: "प्राइसिंग प्रीव्यू",
            systemSize: "सिस्टम साइज",
            approxCost: "अनुमानित लागत (टर्नकी)",
            note: "कीमतें अनुमानित हैं; पैनल/इन्वर्टर ब्रांड और स्ट्रक्चर के अनुसार बदल सकती हैं। पीएम सूर्य घर और राज्य सब्सिडी इसे और घटाएगी।",
            gotIt: "ठीक है",
            close: "बंद करें"
        },
        visualization: {
            title: "कैसे काम करता है",
            subtitle: "सिर्फ अनुमान नहीं—देखें कि सोलर सिस्टम आपके घर में किन ज़ोन्स को चला सकता है।",
            caption: "{kw}kW सिस्टम एक साथ ये ज़ोन चलाता है।",
            green: "ग्रीन एनर्जी",
            warranty: "वारंटी"
        },
        checklist: {
            title: "सब्सिडी के लिए तैयार",
            subtitle: "पीएम सूर्य घर योजना कुछ दस्तावेज़ मांगती है।",
            ready: "आप आवेदन के लिए तैयार हैं!",
            chance: "स्वीकृति की संभावना ऊंची है।",
            items: {
                aadhaar: "आधार कार्ड (मोबाइल से लिंक)",
                bill: "ताज़ा बिजली बिल",
                roof: "छत की फ़ोटो (साफ़ दृश्य)",
                bank: "बैंक खाता विवरण"
            }
        },
        faq: {
            title: "अक्सर पूछे जाने वाले प्रश्न",
            items: {
                q1: "सब्सिडी सीधे बैंक में आएगी?", a1: "हाँ, पीएम सूर्य घर में सब्सिडी सीधे आपके आधार-लिंक्ड बैंक खाते में आती है।",
                q2: "कितनी छत चाहिए?", a2: "लगभग 1 kW के लिए 100 वर्ग फुट छाया-रहित स्थान चाहिए।",
                q3: "सोलर पैनल की वारंटी क्या है?", a3: "अधिकांश टियर-1 पैनल 25 साल की परफॉर्मेंस वारंटी देते हैं।"
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
