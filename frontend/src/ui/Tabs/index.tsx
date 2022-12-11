import { Tab } from '@headlessui/react';

import { Facet } from '../Facet';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
  const categories = ['Bridge', 'Facet'];

  return (
    <div className="mt-16 w-full max-w-xl py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  selected ? 'bg-blue-900 shadow text-white' : 'text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-blue-900 p-3 h-96',
                'bg-blue-900 focus:outline-none'
              )}
            >
              {idx === 1 ? <Facet /> : <p>bridge</p>}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
