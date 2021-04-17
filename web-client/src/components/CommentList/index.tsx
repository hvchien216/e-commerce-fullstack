import Layout from "@components/Layout";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import apiProduct from "@redux/product/api";
import { Comment } from "@redux/product/types";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import CircleProgress from "@components/CircleProgress";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import productApi from "@redux/product/api";
import { showError } from "@config/ServiceErrors";
import { useSelector } from "react-redux";
import { AppState } from "@redux/store";
import InputField from "@components/InputField";
import { alertNotification } from "@utils/index";

interface Props {
  product_id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    formControl: {
      margin: theme.spacing(2),
    },
    large: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    contentAuthor: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      marginbottom: "4px",
      fontsize: "14px",
    },
    authorName: {
      paddingRight: theme.spacing(1),
      fontSize: "12px",
      lineHeight: "18px",
    },
    authorTime: {
      paddingRight: theme.spacing(1),
      fontSize: "12px",
      lineHeight: "18px",
      color: "silver",
    },
    submitBox: {
      marginTop: theme.spacing(1),
    },
  })
);

interface CommentFormValues {
  content: string;
  product_id: string;
}
const schemaCommentForProduct = yup.object().shape({
  content: yup.string().required("Vui lòng nhập ít nhất 1 ký tự để đánh giá"),
  product_id: yup.string().required("Không tìm thấy sản phẩm cần đánh giá"),
});
const Collections: FC<Props> = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [commentList, setcommentList] = useState<Comment[]>([]);
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const user = useSelector((state: AppState) => state.authUser.user);

  useEffect(() => {
    const fetchCommentList = async () => {
      ``;
      if (_.isNil(props?.product_id)) {
        return;
      }
      try {
        setIsLoadingFirstTime(true);

        const result: any = await apiProduct.getCommentListOfProd({
          page: currPage,
          limit: 10,
          product_id: props.product_id,
        });
        setcommentList(result?.comments || []);
        setCurrPage(result?.page);
        setTotalPage(result?.totalPage);
        setIsLoadingFirstTime(false);
      } catch (error) {
        setIsLoadingFirstTime(false);
        console.log(error);
      }
    };
    fetchCommentList();
  }, []);

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const result: any = await apiProduct.getCommentListOfProd({
        page: currPage + 1,
        limit: 10,
        product_id: props.product_id,
      });
      const newList = commentList.concat(result?.comments || []);
      setcommentList(newList);
      setCurrPage(result?.page);
      setTotalPage(result?.totalPage);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    return true;
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<CommentFormValues>({
    defaultValues: {
      content: "",
      product_id: props.product_id,
    },
    resolver: yupResolver(schemaCommentForProduct),
  });
  const contentWatchValue = useWatch({
    control,
    name: "content",
    defaultValue: "",
  });
  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    if (!user) {
      alertNotification("Cần đăng nhập để thực hiện chức năng này!", "error");
      return;
    }
    try {
      const result: any = await productApi.commentForProduct(data);
      if (result.success) {
        let newComment = {
          _id: result.comment._id,
          user_id: {
            info: { ...user?.profile?.info },
          },
          content: result.comment.content,
          createdOn: result.comment.createdOn,
        };
        commentList.unshift(newComment);
        setcommentList(commentList);
        setValue("content", "");
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Box pb="200px">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Box py="16px" display="flex" alignItems="start">
            <Box>
              <Avatar
                alt={user?.profile?.info?.name}
                src={user?.profile?.info?.avatar ?? undefined}
                className={classes.large}
              />
            </Box>
            <Box
              style={{
                position: "relative",
                flex: "1 1 auto",
                minWidth: "1px",
                fontSize: "14px",
                paddingLeft: "8px",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  control={control}
                  name="content"
                  errors={errors}
                  touched={touchedFields}
                  multiline
                  rows={4}
                />
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  className={classes.submitBox}
                >
                  <Button
                    type="submit"
                    disabled={!contentWatchValue || isSubmitting}
                    variant="outlined"
                    color="primary"
                  >
                    {isSubmitting ? <CircularProgress size={23} /> : "Gửi"}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
          {isLoadingFirstTime ? (
            <Box
              my="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircleProgress />
            </Box>
          ) : commentList.length > 0 ? (
            commentList.map((cmt: Comment) => {
              const { user_id, content, createdOn, _id } = cmt;
              return (
                <Box
                  py="16px"
                  display="flex"
                  alignItems="start"
                  key={`comment-${_id}`}
                >
                  <Box>
                    <Avatar
                      alt={user_id.info?.name}
                      src={user_id.info?.avatar ?? undefined}
                      className={classes.large}
                    />
                  </Box>
                  <Box
                    style={{
                      position: "relative",
                      flex: "1 1 auto",
                      minWidth: "1px",
                      fontSize: "14px",
                      wordWrap: "break-word",
                      paddingLeft: "8px",
                    }}
                  >
                    <Box className={classes.contentAuthor}>
                      <Typography
                        variant="caption"
                        className={classes.authorName}
                        color="primary"
                      >
                        {user_id.info?.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.authorTime}
                      >
                        {moment(createdOn).fromNow()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {content}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            "Chưa có bình luận nào"
          )}
          {(_.isNil(props?.product_id) || currPage < totalPage) && (
            <Button
              disabled={isLoading}
              variant="contained"
              color="primary"
              onClick={() => handleLoadMore()}
            >
              {isLoading ? (
                <CircularProgress size={23} />
              ) : (
                "Tải thêm bình luận"
              )}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Collections;
