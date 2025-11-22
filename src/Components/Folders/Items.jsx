import React from 'react';
import 'remixicon/fonts/remixicon.css';

function Items() {
  const array = ['MyProjects.folder', 'AboutMe.txt', 'Contact.apk', 'MyExperience.docx'];

  const colorMap = {
    folder: 'text-blue-600',
    txt: 'text-green-500',
    apk: 'text-orange-500',
    docx: 'text-red-500',
  };

  return (
    <div className="bg-gray-400 w-25  m-4 flex flex-col items-center">
      <div className="mt-5  grid grid-cols-1 gap-5">
        {array.map((item, index) => {
          const ext = item.split('.')[1];
          const name = item.split('.')[0];
          let iconClass = 'ri-file-2-fill'; // fallback

          if (ext === 'folder') iconClass = 'ri-folder-fill';
          else if (ext === 'txt') iconClass = 'ri-file-text-fill';
          else if (ext === 'apk') iconClass = 'ri-apps-fill';
          else if (ext === 'docx') iconClass = 'ri-file-word-fill';

          return (
            <div key={index} className="flex flex-col items-center cursor-pointer select-none">
              <i className={`${iconClass} text-6xl ${colorMap[ext] || 'text-gray-400'}`}></i>
              <span className="mt-2 text-white text-center text-sm break-words">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Items;
