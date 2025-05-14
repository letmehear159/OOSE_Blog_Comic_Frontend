import { Box, useTheme } from "@mui/material";
import AdminHeader from "../AdminHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import axios from "axios";
import { useState, useEffect } from "react";
import apiClient from "../../api/config"; // Adjust the import path as necessary

const AdminManageReports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await apiClient.get(
          "/api/v1/reports/unhandled?type=blog"
        );
        setReports(response.data.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };
    fetchReports();
    console.log("Fetching reports...", reports);
  }, []);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const acceptSelected = async () => {
    for (const id of selected) {
      try {
        await apiClient.post(`/api/v1/reports/${id}/accept`);
      } catch (error) {
        console.error(`Failed to accept report ${id}:`, error);
      }
    }
    setReports(reports.filter((report) => !selected.includes(report.id)));
    setSelected([]);
  };

  const dismissSelected = async () => {
    for (const id of selected) {
      try {
        await apiClient.post(`/api/v1/reports/${id}/dismiss`);
      } catch (error) {
        console.error(`Failed to dismiss report ${id}:`, error);
      }
    }
    setReports(reports.filter((report) => !selected.includes(report.id)));
    setSelected([]);
  };

  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-6">
        <div>
          <AdminHeader
            title="MANAGE REPORTS"
            subtitle="Frequent Users' Reports"
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
            onClick={acceptSelected}
            disabled={selected.length === 0}
          >
            Accept
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
            onClick={dismissSelected}
            disabled={selected.length === 0}
          >
            Dismiss
          </button>
        </div>
      </div>

      {reports.map((report) => (
        <Accordion key={report.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <input
              type="checkbox"
              checked={selected.includes(report.id)}
              onChange={() => handleSelect(report.id)}
              className="mr-4"
            />
            <Typography color={colors.greenAccent[500]} variant="h5">
              {`Report by ${report.username} (${report.type})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{report.content}</Typography>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
                onClick={() => acceptSelected([report.id])}
              >
                Accept
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
                onClick={() => dismissSelected([report.id])}
              >
                Dismiss
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AdminManageReports;
