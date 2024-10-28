import { Image } from 'antd';
import React from 'react';
import logo from '@/assets/images/logo.png';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CountBar = () => {
  return (
    <div className='flex justify-between gap-5'>
      <div className='flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md'>
        <Image
          src={logo}
          alt='total-projects'
          width={50}
          preview={false}
        />
        <div className='ml-5'>
          <h2 className='text-xl font-bold'>Tổng sinh viên</h2>
          <p className='text-gray-500'>50</p>
        </div>
        <div className='absolute right-2'>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className='flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md'>
        <Image
          src={logo}
          alt='total-projects'
          width={50}
          preview={false}
        />
        <div className='ml-5'>
          <h2 className='text-xl font-bold'>Hoàn thành thực tập</h2>
          <p className='text-gray-500'>9</p>
        </div>
        <div className='absolute right-2'>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className='flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md'>
        <Image
          src={logo}
          alt='total-projects'
          width={50}
          preview={false}
        />
        <div className='ml-5'>
          <h2 className='text-xl font-bold'>Đang thực tập</h2>
          <p className='text-gray-500'>40</p>
        </div>
        <div className='absolute right-2'>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className='flex bg-white rounded-xl p-5 flex-1 relative items-center cursor-pointer drop-shadow-md'>
        <Image
          src={logo}
          alt='total-projects'
          width={50}
          preview={false}
        />
        <div className='ml-5'>
          <h2 className='text-xl font-semibold'>Không đạt</h2>
          <p className='text-gray-500'>1</p>
        </div>
        <div className='absolute right-2'>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
};

export default CountBar;
