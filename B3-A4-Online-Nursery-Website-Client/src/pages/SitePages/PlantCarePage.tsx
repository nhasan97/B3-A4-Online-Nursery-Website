import Container from "@/components/layouts/rootLayout/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "../../components/cssStyles/Tab.css";
import GeneralCare from "@/components/modules/SiteComponents/PlantCarePage/GeneralCare";
import IndoorPlants from "@/components/modules/SiteComponents/PlantCarePage/IndoorPlants";
import OutdoorPlants from "@/components/modules/SiteComponents/PlantCarePage/OutdoorPlants";
import SpecificPlants from "@/components/modules/SiteComponents/PlantCarePage/SpecificPlants";
import BonusTips from "@/components/modules/SiteComponents/PlantCarePage/BonusTips";

const PlantCarePage = () => {
  return (
    <div className="w-full h-full md:py-10">
      <Container>
        <div className="w-full h-screen flex flex-col">
          <div className="w-full h-[5%]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Plant Care Guidline</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="w-full h-[95%]">
            <Tabs
              defaultValue="general"
              className="w-full h-[calc(100%-48px)] flex flex-col my-6"
            >
              <TabsList className="TabsList bg-white overflow-x-auto">
                <TabsTrigger className="TabsTrigger" value="general">
                  General Care
                </TabsTrigger>
                <TabsTrigger className="TabsTrigger" value="indoor">
                  Indoor Plants
                </TabsTrigger>
                <TabsTrigger className="TabsTrigger" value="outdoor">
                  Outdoor Plants
                </TabsTrigger>
                <TabsTrigger className="TabsTrigger" value="specific">
                  Specific Plants
                </TabsTrigger>
                <TabsTrigger className="TabsTrigger" value="bonus">
                  Bonus Tips
                </TabsTrigger>
              </TabsList>

              <TabsContent
                className="TabsContent overflow-y-auto"
                value="general"
              >
                <GeneralCare />
              </TabsContent>

              <TabsContent
                className="TabsContent overflow-y-auto"
                value="indoor"
              >
                <IndoorPlants />
              </TabsContent>

              <TabsContent
                className="TabsContent overflow-y-auto"
                value="outdoor"
              >
                <OutdoorPlants />
              </TabsContent>

              <TabsContent
                className="TabsContent overflow-y-auto"
                value="specific"
              >
                <SpecificPlants />
              </TabsContent>

              <TabsContent
                className="TabsContent overflow-y-auto"
                value="bonus"
              >
                <BonusTips />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PlantCarePage;
