import Container from "../../../../layouts/rootLayout/Container";
import SiteTitle from "../../../../shared/SiteTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../ui/accordion";
import faqGif from "../../../../../assets/gifs/FAQs.gif";

const FAQSection = () => {
  return (
    <div className="py-10 my-10 md:my-20">
      <Container>
        <div className="w-full h-full flex flex-col gap-6 sm:gap-12">
          <SiteTitle title={"FAQ"}></SiteTitle>
          <div className="w-full h-full flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <img src={faqGif} alt="" />
            </div>
            <div className="w-full sm:w-1/2 flex items-center">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Do you ship plants across the country?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, we ship plants nationwide. However, some plants may
                    have restrictions based on regional climate and legal
                    guidelines.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit/debit cards, UPI, net banking,
                    and digital wallets like PayPal, Google Pay, and Apple Pay.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Can I cancel or modify my order?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can cancel or modify your order within 24 hours of
                    placing it. Please contact our support team as soon as
                    possible for assistance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How long does delivery take?
                  </AccordionTrigger>
                  <AccordionContent>
                    Delivery usually takes 5-7 business days, depending on your
                    location. You’ll receive a tracking link once your order is
                    shipped.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Do you charge for shipping?
                  </AccordionTrigger>
                  <AccordionContent>
                    Shipping is free for orders above $50. For smaller orders,
                    shipping costs are calculated at checkout based on your
                    location.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQSection;
