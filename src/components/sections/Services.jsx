import { services } from '../../data/services'
import * as Icons from 'lucide-react'
import { Wrench } from 'lucide-react'
import FadeIn from "../animations/FadeIn";

const Services = () => {
    return (
        <section id="services" className=''>
            {/* Background Decorations */}
            <div className="">
                <div className="" />
                <div className="" />
                <div className="" />
            </div>

            {/* Main Background with Linear Gradients */}
            <div 
                className=""
                style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}
            >
                <div className="">
                    <div className="">
                        {/* Header Section */}
                        <FadeIn delay={0}>
                            <div className="">
                                <div className="">
                                    <Wrench className="" />
                                    <span className=""> What I Offer</span>
                                </div>
                                <h2 className="">Built for innovation. Logic for result</h2>
                                <p className=""></p>
                            </div>
                        </FadeIn>

                        {/* First 2 Services (Index 0, 1) */}
                        <div className="">
                            {services.slice(0, 2).map((service, index) => {
                                const IconComponent = Icons[service.icon] || Icons.Code2;
                                return (
                                    <FadeIn key={service.id} delay={100 + index * 100}>
                                        <div className="">
                                            <div className="">
                                                <div className="">
                                                    <IconComponent className="" />
                                                </div>
                                            </div>
                                            <div className="">
                                                <h3 className="">{service.title}</h3>
                                                <p className="">{service.description}</p>
                                            </div>
                                            <div className="" />
                                        </div>
                                    </FadeIn>
                                );
                            })}
                        </div>

                        {/* Remaining Services (Index 2 onwards) */}
                        <div className="">
                            {services.slice(2).map((service, index) => {
                                const IconComponent = Icons[service.icon] || Icons.Code2;
                                return (
                                    <FadeIn key={service.id} delay={300 + index * 100}>
                                        <div className="">
                                            <div className="">
                                                <div className="">
                                                    <IconComponent className="" />
                                                </div>
                                            </div>
                                            <div className="">
                                                <h3 className="">{service.title}</h3>
                                                <p className="">{service.description}</p>
                                            </div>
                                            <div className="" />
                                        </div>
                                    </FadeIn>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;