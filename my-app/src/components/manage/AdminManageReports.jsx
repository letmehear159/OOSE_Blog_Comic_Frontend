import { Box, useTheme } from "@mui/material";
import AdminHeader from "../AdminHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { mockReports } from "../../data_testing/testData";

const AdminManageReports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-6">
        <div>
          <AdminHeader
            title="MANAGE REPORTS"
            subtitle="Frequent Users' Reports"
          />
        </div>
        <div className="flex space-x-20">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200">
            Accept
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200">
            Dismiss
          </button>
        </div>
      </div>

      {mockReports.map((report) => (
        <Accordion key={report.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {`Report by ${report.username} (${report.type})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{report.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AdminManageReports;
