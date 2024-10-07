import React from 'react'
import { UserPlus, Rocket, ShieldCheck, CheckCircle } from 'lucide-react'; 
const Features = () => {
    const features = [
        {
          name: "Sign up for free",
          description:
            "Create an account with ease, no credit card required. Get started with all essential features for free and upgrade as your needs grow.",
          icon: UserPlus,
        },
        {
          name: "Blazing fast",
          description:
            "Experience ultra-fast scheduling and event management with minimal loading times, thanks to our optimized performance and cloud infrastructure.",
          icon: Rocket,
        },
        {
          name: "Super secure with Nylas",
          description:
            "Your data is safe with end-to-end encryption, secure OAuth authentication, and compliance with industry-leading security standards, powered by Nylas.",
          icon: ShieldCheck, 
        },
        {
          name: "Easy to use",
          description:
            "Our intuitive interface is designed for simplicity, making it easy for anyone to schedule, manage, and share events without a learning curve.",
          icon: CheckCircle, 
        },
      ];
    return (
        <section className='py-24'>
            <div className="max-w-2xl mx-auto lg:text-center">
                <p className="font-semibold leading-7 text-primary">Schedule faster</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Schedule meetings in minutes
                </h1>
                <p className="mt-6 text-base leading-snug text-muted-foreground">
                    With CalMarshal you can schedule meetings in minutes. We make it easy
                    for you to schedule meetings in minutes. The meetings are very fast
                    and easy to schedule.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 lg:gap-x-16">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-16">
                            <div className="text-base font-semibold leading-7">
                                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                {feature.name}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground leading-snug">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features