import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const ProfileMenu = ({ user, handleLogout }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex items-center">
        <img
          src={user.profileImage ? `http://localhost:3002${user.profileImage}` : 'https://via.placeholder.com/32'}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
          <hr />
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/add-books"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Your Books
              </Link>
            )}
          </Menu.Item>
          <hr />
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block w-full text-left px-4 py-2 text-sm text-red-700'
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const navigation = {
  categories: [
    {
      id: "fiction",
      name: "Fiction",
      featured: [
        {
          name: "New Releases",
          to: "/fiction",
          imageSrc:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794",
          imageAlt:
            "Collection of bestselling fiction books.",
        },
        {
          name: "Bestsellers",
          to: "/fiction",
          imageSrc:
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
          imageAlt:
            "Popular fiction books displayed on wooden shelf.",
        },
      ],
      sections: [
        {
          id: "genres",
          name: "Genres",
          items: [
            { name: "Literary Fiction", to: "/fiction" },
            { name: "Mystery & Thriller", to: "/fiction" },
            { name: "Science Fiction", to: "/fiction" },
            { name: "Fantasy", to: "/fiction" },
            { name: "Romance", to: "/fiction" },
            { name: "Historical Fiction", to: "/fiction" },
            { name: "Contemporary Fiction", to: "/fiction" },
            { name: "Horror", to: "/fiction" },
            { name: "Short Stories", to: "/fiction" },
          ],
        },
        {
          id: "accessories",
          name: "Course",
          items: [
            { name: "B.tech", to: "#" },
            { name: "BCA", to: "#" },
            { name: "B", to: "#" },
            { name: "Sunglasses", to: "#" },
            { name: "Hats", to: "#" },
            { name: "Belts", to: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", to: "#" },
            { name: "My Way", to: "#" },
            { name: "Re-Arranged", to: "#" },
            { name: "Counterfeit", to: "#" },
            { name: "Significant Other", to: "#" },
          ],
        },
      ],
    },
    {
      id: "non-fiction",
      name: "Non-Fiction",
      featured: [
        {
          name: "Top Sellers",
          to: "/non-fiction",
          imageSrc:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
          imageAlt:
            "Collection of non-fiction books on business and personal development.",
        },
        {
          name: "New Arrivals",
          to: "/non-fiction",
          imageSrc:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
          imageAlt:
            "Latest non-fiction releases displayed on modern bookshelf.",
        },
      ],
      sections: [
        {
          id: "categories",
          name: "Categories",
          items: [
            { name: "Biography & Memoir", to: "/non-fiction" },
            { name: "Business & Economics", to: "/non-fiction" },
            { name: "Self-Help", to: "/non-fiction" },
            { name: "History", to: "/non-fiction" },
            { name: "Science & Technology", to: "/non-fiction" },
            { name: "Philosophy", to: "/non-fiction" },
            { name: "Psychology", to: "/non-fiction" },
          ],
        },
        {
          id: "exam-prep",
          name: "Exam Preparation",
          items: [
            { name: "UPSC", to: "/products" },
            { name: "JEE/NEET", to: "/products" },
            { name: "Banking", to: "/products" },
            { name: "SSC", to: "/products" },
            { name: "GATE", to: "/products" },
            { name: "State Exams", to: "/products" },
          ],
        },
        {
          id: "publishers",
          name: "Top Publishers",
          items: [
            { name: "Pearson", to: "/products" },
            { name: "McGraw Hill", to: "/products" },
            { name: "Oxford", to: "/products" },
            { name: "Cambridge", to: "/products" },
          ],
        },
      ],
    },
    {
      id: "academic",
      name: "Academic & Educational",
      featured: [
        {
          name: "Study Guides",
          to: "/academic",
          imageSrc:
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
          imageAlt:
            "Collection of academic books and study materials.",
        },
        {
          name: "Test Preparation",
          to: "/academic",
          imageSrc:
            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
          imageAlt:
            "Student study materials and textbooks arranged on desk.",
        },
      ],
      sections: [
        {
          id: "subjects",
          name: "Subjects",
          items: [
            { name: "Mathematics", to: "/academic" },
            { name: "Science", to: "/academic" },
            { name: "Engineering", to: "/academic" },
            { name: "Computer Science", to: "/academic" },
            { name: "Medicine", to: "/academic" },
            { name: "Law", to: "/academic" },
            { name: "Browse All Subjects", to: "/academic" },
          ],
        },
        {
          id: "exam-prep",
          name: "Exam Preparation",
          items: [
            { name: "UPSC", to: "/products" },
            { name: "JEE/NEET", to: "/products" },
            { name: "Banking", to: "/products" },
            { name: "SSC", to: "/products" },
            { name: "GATE", to: "/products" },
            { name: "State Exams", to: "/products" },
          ],
        },
        {
          id: "publishers",
          name: "Top Publishers",
          items: [
            { name: "Pearson", to: "/products" },
            { name: "McGraw Hill", to: "/products" },
            { name: "Oxford", to: "/products" },
            { name: "Cambridge", to: "/products" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Home", to: "/" },
    { name: "New Arrivals", to: "/products" },
    { name: "Exchange Books", to: "/add-books" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSearchClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/32';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:3002${imagePath}`;
  };

  return (
    <div className="bg-white z-30 ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <Link
                                to={item.to}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <Link
                                    to={item.to}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        to={page.to}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/signin"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/signup"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a to="#" className="-m-2 flex items-center p-2">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAACUCAMAAAAgTdyMAAAAkFBMVEX/mTMSiAf/////khbJ28cAfQD/4s0AAIDw8PcAAIX29voAAIji4u/8/P3p6fIAAHvKyuF9fbfS0uZYWKQkJI+VlcCvr9BlZay6utZ2dq13d7U3N5inp8k+PpUAAHaTk8ImJopMTJ6IiLagoMgWFo6NjcAwMJRsbKhQUJwWFoZqaqyDg7ZkZJ0fH5AyMowzM4K07MbvAAADLUlEQVR4nO2afW+bMBCHs9uLjWvAmGAcCiFA06QlXb7/t5vJ2mma2v9qJlu/R4oISSTzCHN3PmezAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACfyteY2fyImQ3FDOzCBXafQ6qqphzKplLpamOuZJeZ+/0+Zwv5fn9vsnWGXcVOtltntt0mp/nkDs7wpZVrDLyGnT27W9a1ylZc8sqqtnPnZ7PCyCvYNU9s/1z3JCkl616S+vp5z54a/0N7txOlm5NKuHfLzZpej0K5+VkK34P7tuM1S4ZZaE6kNVH/+8C1mIeE1dzz6J7t0oLlo8xIWKfk1J6doFOygqQcc1Z4Tg6e7VrGCr6ER6VIFET3RIVYTlwg5QVjrd/h/dplecJOJJ1M1vO01/STdJ/y3qU7JenEktxv4vNrV7NuchNRuUDStmQnutJkl7dkl6k6daz2Or5XO3VIKr48WmYiMUi9E1e+03IQNC2BM+VVclA+L8Cr3cgOOr09ZNNI5pIN+qqH7GJoXDKDUqk+sNHnBfi0k13CJkp148JKtRPbfmeuZtdv07lyXzY6pYklnc+SzKedZflt3vGikXy8qEtvr7a/qNPMZdPccp3KmfV4BR7t0oo9uLS2FCT2PNp5ngpb22KaZzueFychJT2wymPO82gnahcRM22PrXbhcTi2synKwsxtP7hAKs3RuDTvfuOxHvNoxx+T3D1UIrPloZx0VdqOJayzZaVb94nNnJbMk0eP5ZhHu8wVkm+zzpTXQp3Z3d0dO6v5Wr4tf1JXhnpM6D7tWK6F1Mpa0xrTVseXxNklL8dqMssnVmnJdc6isttGYvf+zCzjmJlxR5W4M0Lc2fzjSmzksgi9Eou8io57BfTe6lX8tXqlsFev/3QezK3zYP50HrKwOw+Rd43i7vi9dmtlpN3aW6e9i7XTHvkuCcW9w0Uf7U76rMDeWHVnmcW4s0xx/yvgRsT/6PhPwC5cIrf7FjOb7zGz+RIzsAsX2IUL7MIFduECu3CBXbjALlxgFy6wCxfYhQvswgV24QK7cIFduMAuXGAXLrALF9iFC+zCBXbhArtwgV24wC5c4rb7Bb3U1zyAE/jsAAAAAElFTkSuQmCC"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      INR
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* laptop */}
      <header className="relative bg-white z-20 ">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over Rs 499
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              {!isInputVisible && (
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">sell buy books</span>
                  <img className="h-[55px] w-[55px]" src={Logo} alt="" />
                </Link>
              </div>
              )}
              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.to}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2  grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link
                                            to={item.to}
                                            className="cursor-pointer mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </Link>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <Link
                                                  to={item.to}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <ProfileMenu user={user} handleLogout={handleLogout} />
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex lg:ml-6">
                  <a
                    to="#"
                    className="p-2 text-gray-400 hover:text-gray-500"
                    onClick={handleSearchClick}
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                  {isInputVisible && (
                    <input
                      type="text"
                      placeholder="Search..."
                      className="border w-[11rem] md:w-36 rounded-md p-2 ml-2 focus:outline-none focus:ring focus:border-blue-300 
                  lg:ml-2 lg:w-48 xl:w-64"
                    />
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className=" hidden lg:flex ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      CART
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
