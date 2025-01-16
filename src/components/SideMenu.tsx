/**
 * @deprecated
 */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

export function SideMenu({
  title,
  dropdownValues,
  list,
  listFunc,
  dropdownFunc,
}: {
  title: string;
  dropdownValues?: string[];
  list: string[];
  listFunc: Array<() => void>;
  dropdownFunc?: (x: string) => void;
}) {
  return (
    <Card className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        className="bg-gray-50 px-6 py-4 border-b"
      >
        <Typography variant="h5" className="text-gray-800 font-semibold mb-2">
          Select Your Assessment
        </Typography>

        {dropdownValues && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="label-dropdown"
              className="text-sm font-medium text-gray-700"
            >
              {title}
            </label>
            <select
              id="label-dropdown"
              onChange={(e) => dropdownFunc && dropdownFunc(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {dropdownValues.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        )}
      </CardHeader>

      <CardBody className="p-0">
        <List className="p-0">
          {list.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
              transition={{ duration: 0.2 }}
            >
              <ListItem
                onClick={() => listFunc[index]()}
                className="px-6 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors flex items-center gap-3"
              >
                <div className="flex items-center gap-3 w-full">
                  {/* Assessment Icon */}
                  <div className="p-2 rounded-full bg-blue-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08"
                      />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <Typography
                      variant="small"
                      className="font-medium text-gray-700 line-clamp-2"
                    >
                      {item}
                    </Typography>
                  </div>

                  {/* Arrow Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </ListItem>
            </motion.div>
          ))}
        </List>

        {list.length === 0 && (
          <div className="px-6 py-8 text-center">
            <Typography variant="small" className="text-gray-500">
              No assessments available
            </Typography>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
