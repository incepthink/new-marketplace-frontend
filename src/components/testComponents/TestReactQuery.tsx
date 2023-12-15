'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { IPaginatedProduct } from '../../utility/types/product';
import { IUser } from '@/utils/types/UserTypes';
import { getUsersApi } from '../../utils/apis/user';

const TestReactQuery = () => {
  const {
    isLoading,
    isError,
    error,
    data: userData,
    isFetching,
    isPreviousData,
  } = useQuery<IUser[]>(['users'], () => getUsersApi(), {
    // staleTime: Infinity,
    keepPreviousData: true,
    onSuccess(data) {
      console.log('data', data);
    },
  });

  if (isError) return <>Error...</>;
  if (isLoading) return <>Loading...</>;
  if (userData)
    return (
      <>
        <div className="text-xl">Users</div>
        <div className="">
          {userData.map((item) => (
            <div key={item.id}>email: {item.email}</div>
          ))}
        </div>
      </>
    );
  // return <></>
};

export default TestReactQuery;
