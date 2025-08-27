import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

const MultipleSelectorOption = ({ selectedOptions, setSelectedOptions, options }) => {
    const OPTIONS: Option[] = options?.map((topic: any) => ({
        label: topic.topic_name,
        value: topic.id.toString(), // convert id to string
        // optional: disable some items, e.g., based on status
        disable: topic.status !== 'active' ? true : false,
    }));
    // console.log(OPTIONS);
    return (
        <div>
            <MultipleSelector
                value={selectedOptions}
                onChange={setSelectedOptions}
                defaultOptions={OPTIONS}
                placeholder="Select Topic..."
                emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            />
        </div>
    );
};

export default MultipleSelectorOption;
