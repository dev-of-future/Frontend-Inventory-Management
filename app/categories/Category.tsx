'use client'
import React, { useState, useEffect } from 'react';
import ICategory from '../types/category.type';
import CategoryService from '../services/category.service';

const Category = () => {
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchCategorys = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategorys(response.data);
        setError('')
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Unexpected Error!');
        }
      } finally {
        setLoading(false)
      }

    }
    fetchCategorys()
  }, []);

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <span className="loading loading-bars loading-lg"></span>}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((category: ICategory) => (
              <tr key={category.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{category.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {category.email}
                </td>
                <td>{category.phone}</td>
                <td>{category.address}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Category