import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

const MultipleSelectorPeople = ({ selectedOptions, setSelectedOptions, options }) => {
    const OPTIONS: Option[] = options?.map((person: any) => ({
        label: person.name,
        value: person.id.toString(), // convert id to string
        // optional: disable some items, e.g., based on status
        disable: person.status !== 'active' ? true : false,
    }));
    // console.log(OPTIONS);
    return (
        <div>
            <MultipleSelector
                value={selectedOptions}
                onChange={setSelectedOptions}
                defaultOptions={OPTIONS}
                placeholder="Select People..."
                emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            />
        </div>
    );
};

export default MultipleSelectorPeople;
