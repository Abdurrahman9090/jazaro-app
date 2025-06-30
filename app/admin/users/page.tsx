"use client";

import pDebounce from "p-debounce";
import { Button, Form } from "antd";
import { UserAddEditModal } from "@/components/modals";
import { EditFilled } from "@ant-design/icons";
import CustomTable from "@/components/table";
import ScalableCard from "@/components/card";
import TableToolBar from "@/components/tableToolbar";
import { IUsersColumns } from "@/components/tableColumn";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  FIFTY,
  FIVE,
  TEN,
  TWENTY,
  ZERO,
} from "@/constants";
// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { UserSelector } from "@/redux/reducers";
import { deleteUser, getAllUsers } from "@/redux/actions/userAction";
import { IUser, IUserAddEditFormData } from "@/types/reduxTypes/user";

export default function Users() {
  const dispatch = useAppDispatch();
  const IUserState = useSelector(UserSelector);
  const { users, userLoading } = IUserState;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef(search);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NO);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState(Array<string>);

  const [dataSet, setDataSet] = useState<IUser>();
  const [userEditModal, setUserEditModal] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  /**
   * Handle pagination change
   *
   * @param {number} page - Current page number
   * @param {number} currentPageSize - Page size
   */
  const handlePaginationChange = async (
    page: number,
    currentPageSize: number
  ) => {
    setCurrentPage(page);
    setPageSize(currentPageSize);
    const currentSelectedUser = form.getFieldValue("users") || [];
    const newSelectedUsers = [...selectedUsers, ...currentSelectedUser];
    const updatedSelectedUsers: string[] = newSelectedUsers.filter(
      (payload, index, self) => {
        return self.indexOf(payload) === index;
      }
    );
    setSelectedUsers(updatedSelectedUsers);
    setLoading(true);
    await dispatch(
      getAllUsers()
      // { page: page, pageSize: currentPageSize }
    );
    setLoading(false);
    form.setFieldsValue({ payloads: updatedSelectedUsers });
  };

  /**
   * show modal based on edit or new button event
   *
   * @param {string} modalMode - modal visibility for edit or new
   */
  const showModal = (modalMode: string) => {
    modalMode === "edit" ? setUserEditModal(true) : setUserEditModal(false);
    setModalVisibility(true);
  };

  useEffect(() => {
    if (users === null || userLoading) {
      dispatch(
        getAllUsers()
        //{
        // page: currentPage,
        // pageSize: pageSize,
        //}
      );
    }
  }, [users, userLoading]);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const debouncedSearch = useCallback(
    pDebounce(async (curPage: number, currentPageSize: number) => {
      setLoading(true);
      if (searchRef.current.length > 0) {
        await dispatch(
          getAllUsers()
          //   {
          //   page: curPage,
          //   pageSize: currentPageSize,
          //   searchString: searchRef.current,
          // }
        );
      }
      setLoading(false);
    }, 3),
    []
  );

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (search.length === 0) {
      setLoading(false);
      handlePaginationChange(DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE);
    } else {
      setLoading(true);
      debouncedSearch(DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE);
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      await dispatch(
        getAllUsers()
        //{
        // page: DEFAULT_PAGE_NO,
        // pageSize: DEFAULT_PAGE_SIZE,
        // searchString: searchRef.current,
        //}
      );
    })();
  }, []);

  /**
   * add, edit user handler
   *
   * @param {IUserAddEditFormData} fieldData -  edit or new
   */
  const handleEdit = (fieldData: IUserAddEditFormData) => {
    showModal("edit");
    setDataSet(fieldData);
  };

  const tableData =
    (users &&
      users?.map((obj, idx) => {
        return {
          key: obj._id,
          role: obj.role,
          email: obj.email,
          username: obj.username,
          phone: obj.phone,
          verified:obj.verified,
          modify: (
            <Button
              size="small"
              shape="circle"
              icon={<EditFilled />}
              onClick={() => {
                return handleEdit(obj);
              }}
            />
          ),
        };
      })) ||
    [];

  return (
    <ScalableCard>
      <UserAddEditModal
        dataSet={dataSet}
        edit={userEditModal}
        setDataSet={setDataSet}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
      <TableToolBar
        add={true}
        search={true}
        refresh={true}
        deleteAll={true}
        variant="filled"
        deleteBtnDisabled={deleteBtnDisabled}
        refreshEventListener={async () => {
          setLoading(true);
          form.resetFields();
          setSearch("");
          await dispatch(
            getAllUsers()
            // {
            //   page: currentPage,
            //   pageSize: pageSize,
            //   searchString: search,
            // }
          );
          setCurrentPage(1);
          setPageSize(DEFAULT_PAGE_SIZE);
          setLoading(false);
        }}
        deleteEventListener={async () => {
          await dispatch(deleteUser(form.getFieldValue("users")));
          form.resetFields();
          setPageSize(DEFAULT_PAGE_SIZE);
          setDeleteBtnDisabled(true);
        }}
        searchFieldHandler={(e) => {
          setSearch(e.target.value);
        }}
        addEventListener={() => {
          return showModal("add");
        }}
      />
      <Form
        onChange={() => {
          setDeleteBtnDisabled(
            !(
              Array.isArray(form.getFieldValue("users")) &&
              form.getFieldValue("users").length > ZERO
            )
          );
        }}
        layout="vertical"
        form={form}
      >
        <Form.Item name="users" hidden initialValue={[]} />

        <CustomTable
          form={{
            formData: form,
            key: "users",
          }}
          dataSource={tableData}
          search={search}
          loading={loading || userLoading}
          columns={IUsersColumns}
          hasSelectedTitle={"Users"}
          onChange={(pagination) => {
            handlePaginationChange(
              pagination.current as number,
              pagination.pageSize as number
            );
          }}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            showSizeChanger: true,
            position: ["bottomCenter"],
            // total: totalDocumentsUser || 0,
            defaultPageSize: DEFAULT_PAGE_SIZE,
            pageSizeOptions: [FIVE, TEN, TWENTY, FIFTY],
          }}
          setDeleteBtnDisabled={setDeleteBtnDisabled}
        />
      </Form>
    </ScalableCard>
  );
}
