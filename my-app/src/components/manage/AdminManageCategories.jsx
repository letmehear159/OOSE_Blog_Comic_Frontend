import AdminHeader from "../../components/AdminHeader";
import { Box } from "@mui/material";
import { mockCategories } from "../../data_testing/testData";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AdminManageCategories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-6">
        <div>
          <AdminHeader
            title="MANAGE CATEGORIES"
            subtitle="Lists of Categories"
          />
        </div>
      </div>

      {/* Centered Card Grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {mockCategories.map((category) => (
          <Card
            key={category.id}
            sx={{
              width: 280,
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              borderRadius: 3,
              boxShadow: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color={colors.greenAccent[400]}
              >
                {category.name}
              </Typography>
              <Typography variant="body2" color={colors.grey[300]}>
                {category.description}
              </Typography>
            </CardContent>
            <div className="flex justify-between mt-4 px-2 pb-2">
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#22c55e",
                  ":hover": { backgroundColor: "#16a34a" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#eab308",
                  ":hover": { backgroundColor: "#ca8a04" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#dc2626",
                  ":hover": { backgroundColor: "#b91c1c" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Box>
  );
};

export default AdminManageCategories;
