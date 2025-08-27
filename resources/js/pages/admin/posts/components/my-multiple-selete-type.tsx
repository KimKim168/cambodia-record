import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

const MultipleSelectorType = ({ selectedOptions, setSelectedOptions, options }) => {
    const OPTIONS: Option[] = options?.map((typeObject: any) => ({
        label: typeObject.type,
        value: typeObject.id.toString(), // convert id to string
        // optional: disable some typeObjects, e.g., based on status
        disable: typeObject.status !== 'active' ? true : false,
    }));
    // console.log(OPTIONS);
   
    return (
        <div>
            <MultipleSelector
                value={selectedOptions}
                onChange={setSelectedOptions}
                defaultOptions={OPTIONS}
                placeholder="Select Type..."
                emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            />
        </div>
    );
};

export default MultipleSelectorType;
