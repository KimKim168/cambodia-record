import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

const MultipleSelectorLocation = ({ selectedOptions, setSelectedOptions, options }) => {
    const OPTIONS: Option[] = options?.map((location: any) => ({
        label: location.location_name,
        value: location.id.toString(), // convert id to string
        // optional: disable some items, e.g., based on status
        disable: location.status !== 'active' ? true : false,
    }));
    // console.log(OPTIONS);
    return (
        <div>
            <MultipleSelector
                value={selectedOptions}
                onChange={setSelectedOptions}
                defaultOptions={OPTIONS}
                placeholder="Select Location..."
                emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            />
        </div>
    );
};

export default MultipleSelectorLocation;
