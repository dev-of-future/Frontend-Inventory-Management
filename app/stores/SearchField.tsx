import React, { useState, useEffect } from 'react'
import IStoreType from '../types/storeType.type';
import IStore from '../types/store.type';
import Select from 'react-tailwindcss-select';

const initialState = {
  name: '',
  address: '',
  openingDate: ''
}

const SearchField = ({ filterParams, setFilterParams, typeList }: { filterParams: Partial<IStore>, setFilterParams: (filterParams: Partial<IStore>) => void, typeList: IStoreType[] }) => {
  const [searchState, setSearchState] = useState(filterParams);

  useEffect(() => {
    setSearchState(filterParams)
  }, [filterParams])

  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target;
    console.log(name, value)
    setSearchState({ ...searchState, [name]: value });
  };

  const handleSelectChange = (data: any) => {
    setSearchState({ ...searchState, type: data.value });
  }

  const handleSubmit = () => {
    setFilterParams(searchState);
  };

  const clearFilter = () => {
    setFilterParams({});
    setSearchState(initialState);
  }

  return (
    <div>
      <div className='mt-4 flex gap-2 justify-between'>
        <div className='flex gap-2'>
          <div>
            <label htmlFor="type"
              className="block text-sm font-medium text-gray-500"
            >
              Store Type
            </label>
            <Select
              primaryColor={"indigo"}
              placeholder='Select a Store Type...'
              value={searchState.type ? { value: searchState.type, label: searchState.type } : null}
              onChange={handleSelectChange}
              options={typeList.map((type: IStoreType) => ({ value: type, label: type }))}
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <div>
            <label htmlFor="name"
              className="block text-sm font-medium text-gray-500"
            >
              Store Name
            </label>
            <input
              type="text"
              placeholder="Search by Name"
              className="input input-bordered input-info w-full max-w-xs"
              name="name"
              onChange={handleChange}
              value={searchState.name}
            />
          </div>
          <div>
            <label htmlFor="address"
              className="block text-sm font-medium text-gray-500"
            >
              Store Address
            </label>
            <input
              type="text"
              placeholder="Search by Address"
              className="input input-bordered input-info w-full max-w-xs"
              name="address"
              onChange={handleChange}
              value={searchState.address}
            />
          </div>
          <div>
            <label htmlFor="openingDate"
              className="block text-sm font-medium text-gray-500"
            >
              Opening Date
            </label>
            <input
              type="date"
              placeholder="Search by opening date"
              className="input input-bordered input-info w-full max-w-xs"
              name="openingDate"
              onChange={handleChange}
              value={searchState.openingDate}
            />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <button onClick={handleSubmit} className="btn btn-sm btn-primary block">Search</button>
          <button onClick={clearFilter} className="btn btn-sm block">Reset</button>
        </div>
      </div>

    </div>
  )
}

export default SearchField;