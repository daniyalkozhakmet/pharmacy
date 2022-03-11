import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router";
const Paginate = ({ pages, page, keyword = "", isAdmin = false }) => {
    const history=useHistory()
    if (history.location.search.split('&')[0].split('=')[1]!=null){
        keyword=history.location.search.split('&')[0].split('=')[1]
    }
  return (
    <div>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer key={x + 1} to={ !isAdmin ? `/?keyword=${keyword}&page=${x + 1}` : `/admin/products/?keyword=${keyword}&page=${x + 1}`}>
              <Pagination.Item key={x + 1} active={x+1==page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default Paginate;
