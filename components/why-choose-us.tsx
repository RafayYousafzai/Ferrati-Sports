import { CheckCircle, Clock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "./Header";

export default function WhyChooseUs() {
  return (
    <section className="w-full pb-10 md:pb-32 lg:pb-40 bg-white">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <Header
          badge="We own it."
          title="Why Choose "
          highlightedTitle="Us"
          subtitle="Discover the unparalleled advantages that make us the ideal partner for bringing your brand's vision to life."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100 rounded-3xl">
            <CardHeader className="flex flex-col items-center p-0 pb-4">
              <div className="flex items-center justify-center size-20 rounded-full bg-orange-100 text-orange-500 mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="text-5xl font-extrabold text-orange-500 mb-2">
                98%
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Customized Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="text-base text-gray-700">
                Every piece is meticulously crafted to perfectly match your
                brand's unique style, fabric choice, and desired fit. Your
                vision, our expertise.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100 rounded-3xl">
            <CardHeader className="flex flex-col items-center p-0 pb-4">
              <div className="flex items-center justify-center size-20 rounded-full bg-orange-100 text-orange-500 mb-4">
                <Clock className="w-10 h-10" />
              </div>
              <div className="text-5xl font-extrabold text-orange-500 mb-2">
                95%
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Fast Turnaround Time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="text-base text-gray-700">
                From rapid samples in 7-10 days to efficient bulk orders in 3-4
                weeks, we consistently meet deadlines so you can meet your
                customers' demands.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100 rounded-3xl">
            <CardHeader className="flex flex-col items-center p-0 pb-4">
              <div className="flex items-center justify-center size-20 rounded-full bg-orange-100 text-orange-500 mb-4">
                <Users className="w-10 h-10" />
              </div>
              <div className="text-5xl font-extrabold text-orange-500 mb-2">
                99%
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Comprehensive Support
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="text-base text-gray-700">
                Our dedicated in-house design team, expert pattern makers, and
                meticulous packaging specialists are here to ensure your brand
                vision truly comes to life.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
