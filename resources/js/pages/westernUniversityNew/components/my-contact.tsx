
import { Separator } from "@/components/ui/separator";
import { CalendarClockIcon, Mail, MapPin, Phone } from 'lucide-react';
import { MySocial } from './my-social';
import { usePage } from '@inertiajs/react';
import FormMessage from './form-message';


const MyContact = () => {
const { application_info, contact } = usePage().props;

  return(
   
    <div className="flex items-center justify-center my-12 ">
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="grid grid-cols-2 gap-12 lg:grid-cols-12">
        {/* Left - Form & Intro */}
        <div className="col-span-2 lg:col-span-9">
          <div className="text-3xl font-bold tracking-tight md:text-4xl" dangerouslySetInnerHTML={{__html:contact?.short_description}}></div>
          <div className="my-4 w-14 border-[1.5px] border-primary" />
          <div className="text-base sm:text-lg" dangerouslySetInnerHTML={{__html:contact?.long_description}}>
          </div>
          {/* Contact Form */}
          {/* <Card className="mt-8 border-0 overflow-hidden">
            <CardContent className="p-0 overflow-hidden">
              <form className='overflow-hidden'>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      placeholder="First name"
                      id="firstName"
                      className="mt-1.5 h-11 bg-background shadow-none text-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      placeholder="Last name"
                      id="lastName"
                      className="mt-1.5 h-11 bg-background shadow-none text-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Email"
                      id="email"
                      className="mt-1.5 h-11 bg-background shadow-none text-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      id="phone"
                      className="mt-1.5 h-11 bg-background shadow-none text-primary"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Message"
                      className="mt-1.5 h-40 bg-white shadow-none dark:border-white"
                      rows={6}
                    />
                  </div>
                </div>
                <Button
                  className="mt-6 bg-red-800 font-black text-white hover:bg-blue-900"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card> */}
          <FormMessage/>
        </div>
        {/* Right - Contact Info */}
        <div className="col-span-2 lg:col-span-3 flex flex-col gap-10">
          {/* Socials */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Socials</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex gap-3">
              <MySocial/>
            </div>
          </div>

          {/* Phone */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Phone</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-center gap-2 text-primary text-base">
              <Phone className="w-5 "/> {application_info?.phone}
            </div>
            
          </div>

          {/* Email */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Email</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-center gap-2 text-primary text-base">
              <Mail className="w-5" /> {application_info?.email}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Address</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-center gap-2 text-primary text-base">
              <MapPin className="w-12 " />
              <span>{application_info?.address}</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Opening Hours</h3>
            <Separator className="mb-4 mt-2" />
            <div className="flex items-center gap-2 text-primary text-base">
              <CalendarClockIcon className="w-5" />
              <span>{application_info?.working_hours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
};

export default MyContact;
