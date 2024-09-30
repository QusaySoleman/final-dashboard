//by nour
import { Row, Col } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import "../CssFolder/complaints.css"
// to swith the arrow of the pagination
const useStyles = makeStyles((theme) => ({
  rtlPagination: {
    "& .MuiPaginationItem-icon": {
      transform: "scaleX(-1)", // Flip the arrow horizontally
    },
  },
}));
function PaginationComp() {
  const classes = useStyles();
  return (
    <Row className="justify-content-center mt-4">
      <Col className="flex justify-content-center" xs={12} md={8}>
        <Stack spacing={1}>
          <Pagination
            count={99}
            shape="rounded"
            classes={{ ul: classes.rtlPagination }}
          />
        </Stack>
      </Col>
    </Row>
  );
}
export default PaginationComp;
