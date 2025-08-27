import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

const MultipleSelectorCreator = ({ selectedOptions, setSelectedOptions, options }) => {
    const OPTIONS: Option[] = options?.map((creator: any) => ({
        label: creator.name,
        value: creator.id.toString(), // convert id to string
        // optional: disable some items, e.g., based on status
        disable: creator.status !== 'active' ? true : false,
    }));
    // console.log(OPTIONS);
    return (
        <div>
            <MultipleSelector
                value={selectedOptions}
                onChange={setSelectedOptions}
                defaultOptions={OPTIONS}
                placeholder="Select Creator..."
                emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            />
        </div>
    );
};

export default MultipleSelectorCreator;
