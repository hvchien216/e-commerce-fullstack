import React, {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import apiProduct from "@redux/product/api";
import {
  Brand,
  ObjectImageProduct,
  Product,
  Variant,
} from "@redux/product/types";
import { AppContext } from "next/app";
import { GetServerSidePropsContext } from "next";
import Layout from "@components/Layout";
import {
  Box,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import ProductItem from "@components/ProductItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { FILTER_BY_RANGE_PRICE } from "@config/index";
import CircleProgress from "@components/CircleProgress";
import { useRouter } from "next/router";
import { removeBlankAttbObj } from "@utils/index";
import InfiniteScroll from "react-infinite-scroll-component";

interface BrandCheckBox extends Brand {
  checked: boolean;
}
interface VariantCheckBox {
  _id: string;
  name: string;
  checked: boolean;
}
interface Props {
  products: Product[];
  totalPage: number;
  page: number;
  path: string;
  // brands: BrandCheckBox[];
  // variants: VariantCheckBox[];
}

const convertToValueQs = (
  checked: boolean,
  name: string,
  valueWantParse: string
) => {
  if (!valueWantParse) {
    return name;
  } else {
    const array: string[] = valueWantParse.split(",");
    let result: string[] = [];
    if (!checked) {
      result = array.filter((item) => item !== name);
    } else {
      result = [...array, name];
    }
    return [...new Set(result)].join(",") || undefined;
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      fontWeight: 500,
      fontSize: theme.typography.h3.fontSize,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    formControl: {
      margin: theme.spacing(2),
    },
  })
);
const Collections: FC<Props> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [productList, setProductList] = useState<Product[]>(
    props?.products || []
  );
  const [brandList, setBrandList] = useState<BrandCheckBox[]>([]);

  const [variantList, setVariantList] = useState<VariantCheckBox[]>([]);
  const [serverFetchDone, setServerFetchDone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(props.page || 1);
  const [totalPage, setTotalPage] = useState<number>(props.totalPage | 1);

  const fetchProductSearchList = useCallback(async () => {
    if (serverFetchDone) {
      //tránh sai current_page khi chuyển route = nút BACK
      if (router.query?.page) {
        setCurrPage(parseInt(router.query?.page as string));
      }
      setIsLoading(true);

      const data: any = await apiProduct.getProductList({
        ...router.query,
        category:
          (router.query?.category_name as string)?.replace("-", "/") ||
          undefined,
        page: 1,
      });
      setIsLoading(false);

      setProductList(data?.products);
      setTotalPage(data?.totalPage);
      setCurrPage(data?.page);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchBrandsAndVariants = async () => {
      let brands = [];
      let variants = [];
      // check params is exist on url to map array checked variant brand
      try {
        const fetchParallel: any = await Promise.all([
          apiProduct.getBrandList(),
          apiProduct.getVariantList(),
        ]);
        brands = fetchParallel[0].brands;
        variants = fetchParallel[1].variants;
        setBrandList(brands);
        setVariantList(variants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrandsAndVariants();
    setServerFetchDone(true);
  }, []);

  useEffect(() => {
    fetchProductSearchList();
  }, [fetchProductSearchList]);

  const handleLoadMore = async () => {
    try {
      const data: any = await apiProduct.getProductList({
        ...router.query,
        category:
          (router.query?.category_name as string)?.replace("-", "/") ||
          undefined,
        page: currPage + 1,
      });
      //TO-DO: check status for error handling, and add pagination if needed.
      const newList = productList.concat(data?.products || []);
      setProductList(newList);
      setTotalPage(data?.totalPage);
      setCurrPage(data?.page);
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    queryName: string
  ) => {
    const query = removeBlankAttbObj({
      ...router.query,
      [`${queryName}`]: convertToValueQs(
        e.target.checked,
        e.target.name,
        router.query[`${queryName}`] as string
      ),
    });
    delete query["category_name"];
    router.push(
      {
        pathname:
          props.path === "/products"
            ? props.path
            : `${props.path}/${router.query.category_name}`,
        query: {
          ...query,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleChangeSortByPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const query = removeBlankAttbObj({
      ...router.query,
      ...JSON.parse(e.target.value),
    });
    delete query["category_name"];
    router.push(
      {
        pathname:
          props.path === "/products"
            ? props.path
            : `${props.path}/${router.query.category_name}`,
        query: {
          ...query,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  return (
    <Layout>
      <Box my="20px">
        <Typography color="primary" className={classes.title}>
          Tất cả sản phẩm
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Paper style={{ position: "sticky", top: "10px" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content2"
                id="panel1a-header2"
              >
                <Typography className={classes.heading}>GIÁ THÀNH</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    <RadioGroup
                      name="sortByPrice"
                      onChange={handleChangeSortByPrice}
                    >
                      {FILTER_BY_RANGE_PRICE.map((price: any) => {
                        return (
                          <FormControlLabel
                            key={price.id}
                            value={JSON.stringify(price.value)}
                            control={<Radio />}
                            label={price.name}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>THƯƠNG HIỆU</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    {brandList.map((b: BrandCheckBox) => {
                      return (
                        <FormControlLabel
                          key={`${b._id}`}
                          control={
                            <Checkbox
                              checked={b.checked}
                              onChange={(e) => handleChange(e, "brands")}
                              name={b.name}
                            />
                          }
                          label={b.name}
                        />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content2"
                id="panel1a-header2"
              >
                <Typography className={classes.heading}>KÍCH CỠ</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    {variantList
                      .sort((a: VariantCheckBox, b: VariantCheckBox): any => {
                        if (a.name < b.name) {
                          return -1;
                        }
                      })
                      .map((v: VariantCheckBox) => {
                        return (
                          <FormControlLabel
                            key={`${v.name}`}
                            control={
                              <Checkbox
                                checked={v.checked}
                                onChange={(e) => handleChange(e, "sizes")}
                                name={v.name}
                              />
                            }
                            label={v.name}
                          />
                        );
                      })}
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
        <Grid item md={9} xs={12}>
          <Paper style={{ padding: "8px" }}>
            {isLoading ? (
              <Box
                mt="40px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircleProgress />
              </Box>
            ) : (
              <InfiniteScroll
                dataLength={productList.length}
                next={handleLoadMore}
                hasMore={currPage < totalPage}
                loader={
                  <Box mt="30px" display="flex" justifyContent="center">
                    <CircleProgress />
                  </Box>
                }
                style={{ overflow: "unset" }}
              >
                <Grid container spacing={2}>
                  {productList?.map((p: Product) => {
                    let imgPrimary = p.images.filter(
                      (img: ObjectImageProduct) => img.primary === true
                    );
                    let variantFirst = p.variants[0];
                    return (
                      <Fragment key={`${p?.name} ${p?._id}`}>
                        <Grid item md={4} xs={6}>
                          <ProductItem
                            id={p?._id}
                            name={p?.name}
                            code={p?.code}
                            url={imgPrimary[0]?.url}
                            price={variantFirst.unit_price}
                            discount_rate={variantFirst.discount_rate}
                            slug={p?.slug_name}
                          />
                        </Grid>
                      </Fragment>
                    );
                  })}
                  {!productList?.length && (
                    <Typography style={{ padding: "16px" }}>
                      Không tìm thấy sản phẩm phù hợp
                    </Typography>
                  )}
                </Grid>
              </InfiniteScroll>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Collections;
