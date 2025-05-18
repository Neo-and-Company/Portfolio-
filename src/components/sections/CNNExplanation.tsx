
import React from 'react';

const CNNExplanation: React.FC = () => {
    return (
        <section id="cnnExplanationSection" className="py-16 px-4 md:px-8 bg-card text-card-foreground shadow-inner"> {/* Example uses #FFFFFF, card is similar */}
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
                    Understanding Convolutional Neural Networks
                </h2>
                <div className="max-w-2xl mx-auto space-y-5">
                    <p className="text-lg leading-relaxed text-foreground">
                        The animation above depicts a simplified flow through a CNN. Input data (like an image) passes through convolutional and pooling layers for feature extraction, then through fully connected layers for classification. Scroll to see the animation activate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="text-lg leading-relaxed text-foreground">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CNNExplanation;
