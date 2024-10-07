import React from "react";
import { Row, Col } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  rtlPagination: {
    "& .MuiPaginationItem-icon": {
      transform: "scaleX(-1)", // Flip the arrow horizontally
    },
  },
}));

function ComplaintPagination({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) {
  const classes = useStyles();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, page) => {
    paginate(page);
  };
  return (
    <Row className="justify-content-center mt-4">
      <Col className="flex justify-content-center" xs={12} md={8}>
        <Stack spacing={1}>
          <Pagination
            count={totalPages}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            classes={{ ul: classes.rtlPagination }}
          />
        </Stack>
      </Col>
    </Row>
  );
}

export default ComplaintPagination;
