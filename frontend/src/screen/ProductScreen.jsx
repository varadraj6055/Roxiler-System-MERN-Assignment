import { useState, useEffect } from "react";
import { Container, Table, Col, Row, Image, Spinner } from "react-bootstrap";
import SearchInput from "../component/SearchInput";
import SelectMonth from "../component/SelectMonth";
import Paginate from "../component/Paginate"; // Import the pagination component
import { debounce } from "../lib/utils";
import { monthsOptions, API_URL } from "../constant";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [month, setMonth] = useState("03");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // const seedData = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}products/seedData`);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(`error SEEDING DATABASE`, error);
  //   }
  // };

  const fetchProducts = async (month, page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}products?search=${searchQuery}&month=${month}&page=${page}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data?.data?.results);
      const paginateTotalPages = Math.ceil(data?.totalResults / itemsPerPage);
      console.log(paginateTotalPages);
      setTotalPages(paginateTotalPages);
    } catch (error) {
      console.error(`Error while fetching products`, error);
    } finally {
      setLoading(false);
    }
  };


  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 1000);

  useEffect(() => {
    // seedData()
    fetchProducts(month, currentPage);
  }, [searchQuery, month, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset current page to 1 when month changes
  }, [month]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container>
        <Row className="py-4">
          <Col md="4">
            <SearchInput
              placeholder={"search..."}
              onChangeValue={(e) => debouncedSearch(e.target.value)}
            />
          </Col>
          <Col md="4">
            <SelectMonth
              options={monthsOptions}
              selectedOption={month}
              onValueChange={setMonth}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <Spinner animation="border" role="status">
                  {/* <span className="sr-only">Loading...</span> */}
                </Spinner>
              </div>
            ) : (
              <>
                <div className="table-container">
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product, index) => (
                        <tr key={index}>
                          <td>{product?.id}</td>
                          <td>{product?.title}</td>
                          <td>{product?.description}</td>
                          <td>{product?.price} ₹</td>
                          <td>{product?.category}</td>
                          <td>{product?.sold ? "Yes" : "No"}</td>
                          <td>
                            <Image
                              src={product?.image}
                              alt={product?.title}
                              thumbnail
                              className="table-image imgSize"
                            />
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && (
                        <tr className="hover:bg-[#2C3E50]/60">
                          <td className="h-24 text-center" colSpan={12}>
                            No results found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </Col>
        </Row>
        <Row className=" my-3">
          <Col>
            <p className="text-center p-2">page no : {currentPage}</p>
          </Col>
          <Col className="d-flex justify-content-center p-2">
            <Paginate
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
          <Col>
            <p className="text-center p-2">per page : {itemsPerPage}</p>
          </Col>
          {/* <Col className="d-flex justify-content-center my-4">
            <Paginate
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default ProductScreen;
