"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const FEATURES = [
  {
    title: "Digital Warranty Creation",
    description: [
      "We transform your traditional paper",
      " receipts and warranty cards into secure,",
      "digital records. Simply snap a photo or ",
      "upload a pdf, and our system extracts the ",
      "key data points, creating a standardized,",
      "error-free digital warranty entry"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Online Warranty Backup & Storage",
    description: [
      "Say goodbye to filing cabinets. All your",
      "valuable warranty data is stored securely",
      "in the cloud with bank-level encryption. ",
      "Access your proof-of-purchase and ",
      "warranty terms anytime, from any device."
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: "Create / Record Multiple Warranties",
    description: [
      "Easily manage warranties for all your",
      "assets, whether it's for a single home, a",
      "portfolio of rental properties, or an entire",
      "business inventory. Categorize and tag",
      "items for simplified tracking and portfolio",
      "management."
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const ArrowIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const ACCESS_ITEMS = [
  {
    title: "Agent & Customer Accounts Available",
    description:
      "Whether you're an individual user or a business managing multiple clients, our platform supports both agent and customer accounts to suit your needs.",
  },
  {
    title: "Multiple User Login",
    description:
      "Share access with family members, co-workers, or property managers. Control who can view and manage warranties within your account, promoting efficient collaboration across households or teams.",
  },
  {
    title: "Realtime Warranty Creation & Processing",
    description:
      "Create and process warranties instantly with real-time updates, ensuring faster registrations and seamless management.",
  },
  {
    title: "Fast Customer Support",
    description:
      "Get quick help from our support team whenever you need assistance with warranties or account access.",
  },
];


const FAQS = [
  {
    q: "Is WarrantyDB truly free?",
    a: "Yes. WarrantyDB offers a free plan that allows you to store and manage your warranties securely."
  },
  {
    q: "How do I add a new warranty?",
    a: "You can add a warranty by uploading a receipt or entering warranty details manually from your dashboard."
  },
  {
    q: "What kind of warranties can I track?",
    a: "You can track appliance, electronics, vehicle, home equipment, and many other warranties."
  },
  {
    q: "Is my data safe?",
    a: "Yes. We use industry-standard encryption and security protocols to ensure your purchase history and personal information are protected."
  }
]


export default function LandingPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleGetStarted = () => {
    console.log("Get Started clicked - would navigate to signup")
    // In a real app, this would navigate to signup/login
  }
  const [activeIndex, setActiveIndex] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null)


  return (
    <div className="bg-background">

      {/* Hero Section */}
      {/* <section className="relative bg-black text-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 overflow-visible"> */}
      {/* <section className="relative bg-black text-white pt-24 pb-48 px-4 sm:px-6 overflow-visible"> */}
      {/* <section className="relative bg-black text-white pt-24 pb-[428px] px-4 sm:px-6 overflow-visible rounded-b-4xl"> */}
      <section
  className="
    relative bg-black text-white
    pt-14
    sm:pt-20
    lg:pt-24
    pb-60
    sm:pb-56
    lg:pb-[428px]
    px-4 sm:px-6
    overflow-visible
    rounded-b-4xl
  "
>

        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold leading-tight lg:leading-[1.19] mb-4 sm:mb-6 text-balance">
            The Digital Vault for
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Product Peace of Mind.
          </h1>

          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto px-4 sm:px-0">
            Instantly find the warranty information you need, when   <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>you need it most.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-[#ED1C24] hover:bg-[#FF2D20]/95 rounded-4xl text-white px-5 sm:px-8 py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Get Started Now
            </Button>
          </Link>
        </div>

        {/* Dashboard Preview */}
        {/* <div
          className="absolute left-1/2 bottom-0 z-10"
          style={{
            width: '1081px',
            transform: 'translate(-50%, 50%)',
          }}
        >
          <div
            className="overflow-hidden "
            style={{ borderRadius: '30px' }}
          >
            <Image
              src="/images/dashboard1.png"
              alt="Dashboard Preview"
              width={1081}
              height={676}
              className="w-full block"
              priority
            />
          </div>
        </div> */}


        {/* Dashboard Preview */}
        <div className="absolute left-1/2 bottom-0 z-10 w-full -translate-x-1/2 translate-y-1/3 sm:translate-y-1/2">
          <div className="mx-auto w-[92%] max-w-[1081px]">
            <div className="overflow-hidden rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] shadow-xl">
              <Image
                src="/images/dashboard1.png"
                alt="Dashboard Preview"
                width={1081}
                height={676}
                priority
                className="w-full h-auto block"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 90vw, 1081px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      {/* <section className="pt-[368px] pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">What We Do</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border">
              <div className="mb-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">Digital Warranty Creation</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We transform your traditional paper receipts and warranty cards into secure, digital records. Simply
                take a photo or upload documents, creating a searchable, panic-proof digital filing system for all your
                warranty needs.
              </p>
            </div>

            <div className="bg-[#FF2D20] rounded-xl p-6 sm:p-8 shadow-sm text-white sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF2D20]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">Onsite Warranty Backup & Storage</h3>
              <p className="leading-relaxed text-sm sm:text-base">
                Say goodbye to filing cabinets and losing receipts. Your warranty data is stored securely in the Cloud
                with best-in-class encryption. Whether its a fire, flood, or loss, your purchase records and warranty
                coverage are safely backed up and recoverable.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border">
              <div className="mb-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">Create/Record Multiple Warranties</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Track all your warranty-backed assets, whether its for a single home, a portfolio of rental properties,
                or an entire business. Simplified tracking and simplified warranty management.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="pt-[398px] pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 bg-background"> */}
      <section
        className="
    pt-40
    sm:pt-36
    md:pt-40
    lg:pt-[398px]
    pb-10
    sm:pb-16
    lg:pb-20
    px-4
    sm:px-6
    bg-background
  "
      >

        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
            What We Do
          </h2>

          {/* Mobile: scroll, Desktop: grid */}
          <div className="lg:hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
              {FEATURES.map((item, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative flex-shrink-0 text-left w-[320px] rounded-2xl border transition-all duration-200 overflow-hidden
                    ${active ? "bg-[#FF2D20] text-white border-transparent" : "bg-white text-black border-border"}
                  `}
                  >
                    {/* icon bubble */}
                    <div
                      className={`absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center
    ${active ? "bg-white text-[#E31D1C]" : "bg-muted text-black"}
  `}
                    >
                      {item.icon}
                    </div>


                    {/* content */}
                    <div className="p-6 pt-24">
                      <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                      <p className={`text-sm leading-relaxed ${active ? "text-white/90" : "text-muted-foreground"}`}>
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 h-[298] gap-6 sm:gap-8">
            {FEATURES.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative text-left rounded-2xl border transition-all duration-200 overflow-visible
    ${active ? "bg-[#E31D1C] text-white border-transparent" : "bg-gray-100 text-black border-border"}
  `}
                >
                  <div
                    className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2
      w-19 h-19 rounded-full flex items-center justify-center
      border-4 border-white
      ${active ? "bg-[#E31D1C] text-white" : "bg-muted text-red-500"}
    `}
                  >
                    <ArrowIcon />
                  </div>

                  {/* here */}
                  <div className="pl-10 pt-10 pb-10 pr-6">
                    <h3 className="text-lg font-bold mb-3 mt-5">{item.title}</h3>
                    <p className={`text-sm leading-relaxed ${active ? "text-white/90" : "text-muted-foreground"}`}>
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why You Need WarrantyDB Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-7">Why You Need WarrantyDB</h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8">
              <div className="mb-4 sm:mb-6">
                <Image
                  src="/images/text.png"
                  alt="24/7 Access"
                  width={400}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">24/7 Access to Warranty <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Information</h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                If your appliance breaks down at 3 AM, you dont have to search through folders. Your warranty is
                digitally accessible from your phone, tablet, or desktop, ensuring you can get help immediately.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8">
              <div className="mb-4 sm:mb-6">
                <Image
                  src="/images/text1.png"
                  alt="Online Backup"
                  width={400}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Online Backup of Warranty <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Data</h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                Protect your investments from physical damage. In case of fire, flood, or loss, your purchase records
                and warranty coverage are safely backed up and recoverable, giving you total peace of mind.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8">
              <div className="mb-4 sm:mb-6">
                <Image
                  src="/images/text2.png"
                  alt="Environmentally Friendly"
                  width={400}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Environmentally Friendly, Reduced<br className="hidden sm:block" />
                <span className="sm:hidden"> </span> Paper Usage</h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                Join us in reducing paper waste. By digitizing your documents, you help save trees and contribute to a
                cleaner, more sustainable environment. WarrantyDB: Go Digital. Go Green.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8">
              <div className="mb-4 sm:mb-6">
                <Image
                  src="/images/text3.png"
                  alt="Online Warranty Activation"
                  width={400}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Online Warranty<br className="hidden sm:block" />
                <span className="sm:hidden"> </span> Activation</h3>
              <p className="text-black leading-relaxed text-sm sm:text-base">
                For eligible products, we offer seamless tools to help you register and activate your manufacturer
                warranty online immediately after purchase, ensuring your coverage is valid from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Access Section */}
      <section className="py-12 sm:py-16 lg:py-8 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-left mb-10">
            Online Access: The Platform Experience
          </h2>

          <div className="space-y-4">
            {ACCESS_ITEMS.map((item, idx) => {
              const isOpen = expandedFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-[#FFF5F4] border border-[#FFE1DE] rounded-2xl overflow-hidden transition"
                >
                  {/* Header */}
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <h3 className="lg:text-xl sm:text-lg font-semibold text-black">
                      {item.title}
                    </h3>

                    {/* Icon */}
                    <span
                      className={`w-4 h-4 flex items-center justify-center rounded-full border-1 border-[#FF2D20] text-[#FF2D20] transition-transform duration-300
                  ${isOpen ? "rotate-180" : ""}
                `}
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Content */}
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300
                ${isOpen ? "max-h-40 pb-5" : "max-h-0"}
              `}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-17 px-4 sm:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2">
            Frequently asked questions
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            We are happy to answer your questions
          </p>

          <div className="space-y-4">
            {FAQS.map((item, idx) => {
              const open = openIndex === idx

              return (
                <div
                  key={idx}
                  className="border-t border-b border-border bg-white transition-shadow"
                >
                  {/* Header */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="sm:text-lg lg:text-xl font-medium">
                      {item.q}
                    </span>

                    {/* Icon */}
                    <span
                      className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors
                      ${open ? "bg-[#FF2D20]" : "bg-muted"}
                    `}
                    >
                      {open ? (
                        /* X icon */
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        /* Plus icon */
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out
                    ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  `}
                  >
                    <div className="overflow-hidden px-6 pb-5 text-sm sm:text-base text-muted-foreground">
                      {item.a}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}