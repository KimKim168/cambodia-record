import { usePage } from "@inertiajs/react";

const MyGoogleMap = () => {
        const { application_info } = usePage().props;
    
    return (
        <div className="relative mt-12 h-96 w-full">
            <iframe
                src={application_info?.google_map}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute top-0 left-0 h-full w-full"
            ></iframe>
        </div>
    );
};

export default MyGoogleMap;
