import React, { useEffect, useState } from "react";
import cx from "classnames";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";
import { CURRENCIES, DEFAULT_CURRENCY } from "../config/currencies";
import { useMainContext } from "../context/MainContext";
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { fromUpperCase } from "../utils/fromUpperCase";

const NAVIGATION_ITEMS = [
  { name: "telefony" },
  { name: "komputery" },
  { name: "telewizory" },
];
function Navigation() {
  const { changeCurrentCurrency, currentCurrency } = useMainContext();
  const [displayCategory, setDisplayCategory] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<string>("telefony");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (/^\/category\/[a-zA-Z0-9-_]+(\/)?$/?.test(pathname)) {
      setDisplayCategory(true);
      const categoryName = pathname.match(
        /\/category\/([a-zA-Z0-9-]+)\/?/
      )?.[1];

      if (
        categoryName &&
        NAVIGATION_ITEMS.findIndex(
          ({ name }) => name.toLowerCase() === categoryName?.toLowerCase()
        ) !== -1
      ) {
        setCurrentLocation(categoryName);
      } else {
        navigate("/");
      }
    } else {
      setDisplayCategory(false);
    }
  }, [pathname]);

  return (
    <nav className="mt-6 w-full bg-white px-8">
      <div className="w-full border-y-2 border-y-zinc-200 h-20 flex items-center px-6 justify-between">
        <ul className="flex gap-8 text-sm font-medium text-gray-700">
          {NAVIGATION_ITEMS.map(({ name }) => (
            <li
              className={cx({
                "text-purple-600": displayCategory && name === currentLocation,
                "cursor-pointer hover:underline":
                  displayCategory && name !== currentLocation,
              })}
              onClick={() => setCurrentLocation(name)}
            >
              <Link to={`/category/${name}`}>{fromUpperCase(name)}</Link>
            </li>
          ))}
        </ul>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 ">
          <img src={logo} alt="" />
        </Link>

        <div className="flex">
          <select
            className="mr-8"
            defaultValue={DEFAULT_CURRENCY}
            onChange={(ev) => changeCurrentCurrency(ev.target.value)}
            value={currentCurrency}
          >
            {CURRENCIES.map(({ key }) => (
              <option value={key}>{key}</option>
            ))}
          </select>
          <div className="flex items-center gap-4">
            <Icon icon="clarity:user-line" className="text-2xl" />
            <Icon icon="clarity:shopping-bag-line" className="text-2xl" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
