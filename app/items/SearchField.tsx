import React, { useState, useEffect } from 'react'
import Select from 'react-tailwindcss-select';
import ICategory from '../types/category.type';

const initialState = {
  name: '',
  description: '',
  minQuantity: '',
  maxQuantity: '',
  categoryName: '',
  minPrice: '',
  maxPrice: ''
}

const SearchField = ({ filterParams, setFilterParams, categories }: any) => {
  const [searchState, setSearchState] = useState(filterParams);

  useEffect(() => {
    setSearchState(filterParams)
  }, [filterParams])

  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target;
    setSearchState({ ...searchState, [name]: value });
  };

  const handleSelectChange = (data: any) => {
    setSearchState({ ...searchState, categoryName: data.value });
  }

  const handleSubmit = () => {
    setFilterParams(searchState);
  };

  const clearFilter = () => {
    setFilterParams({});
    setSearchState(initialState);
  }

  return (
    <div className='mt-4 flex gap-1 justify-between'>
      <div>
        <div>
          <label htmlFor="name"
            className="block text-sm font-medium text-gray-500"
          >
            Item Name
          </label>
          <input
            type="text"
            placeholder="Search by Name..."
            className="input input-bordered input-info w-full max-w-xs"
            name="name"
            id="name"
            onChange={handleChange}
            value={searchState?.name}
          />
        </div>
        <div>
          <label htmlFor="description"
            className="block text-sm font-medium text-gray-500"
          >
            Item Description
          </label>
          <input
            type="text"
            placeholder="Search by Description..."
            className="input input-bordered input-info w-full max-w-xs"
            name="description"
            id="description"
            onChange={handleChange}
            value={searchState?.description}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="minQuantity"
            className="block text-sm font-medium text-gray-500"
          >
            Min Quantity
          </label>
          <input
            type="number"
            placeholder="Search by Min Quantity..."
            className="input input-bordered input-info w-full max-w-xs"
            name="minQuantity"
            id="minQuantity"
            onChange={handleChange}
            value={searchState?.minQuantity}
          />
        </div>
        <div>
          <label htmlFor="maxQuantity"
            className="block text-sm font-medium text-gray-500"
          >
            Max Quantity
          </label>
          <input
            type="number"
            placeholder="Search by Max Quantity..."
            className="input input-bordered input-info w-full max-w-xs"
            name="maxQuantity"
            onChange={handleChange}
            value={searchState?.maxQuantity}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="minPrice"
            className="block text-sm font-medium text-gray-500"
          >
            Min Price
          </label>
          <input
            type="number"
            placeholder="Search by Min Price..."
            className="input input-bordered input-info w-full max-w-xs"
            name="minPrice"
            onChange={handleChange}
            value={searchState?.minPrice}
          />
        </div>
        <div>
          <label htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-500"
          >
            Max Price
          </label>
          <input
            type="number"
            placeholder="Search by Max Price..."
            className="input input-bordered input-info w-full max-w-xs"
            name="maxPrice"
            onChange={handleChange}
            value={searchState?.maxPrice}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 justify-end mt-5'>
          <button onClick={handleSubmit} className="btn btn-md btn-primary">Search</button>
          <button onClick={clearFilter} className="btn btn-md">Reset</button>
        </div>
        <div>
          <label htmlFor="categoryName"
            className="block text-sm font-medium text-gray-500"
          >
            Category Name
          </label>
          <Select
            primaryColor={"indigo"}
            placeholder='Select a Category Name...'
            value={searchState?.categoryName ? { value: searchState.categoryName, label: searchState.categoryName } : null}
            onChange={handleSelectChange}
            options={categories.map((category: ICategory) => ({ value: category.name, label: category.name }))}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchField;