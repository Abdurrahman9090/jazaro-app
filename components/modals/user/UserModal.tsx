import React, { useEffect, useState } from "react";
import { Col, Form, Grid, Row, Switch } from "antd";

import { initFormFields } from "@/utils";
import ScalableCard from "@/components/card";
import CustomModal from "@/components/modal";
import { InputLength, UserRoles } from "@/types";
import ScalableInput from "@/components/input";
import CustomDropdown from "@/components/dropdown";
import ScalableButton from "@/components/button";
import { IUserModalProps } from "./types";
// redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { AuthSelector } from "@/redux/reducers";
import { addUpdateUser } from "@/redux/actions/userAction";
import { IUserAddEditFormData } from "@/types/reduxTypes/user";

/**
 * user add modal dialog
 *
 *
 * @param {IUserModalProps} props - props of modal
 * @returns {React.FC} user modal dialog
 */
const UserAddEditModal: React.FC<IUserModalProps> = (
  props: IUserModalProps
) => {
  const { useBreakpoint } = Grid;

  const { dataSet, setDataSet } = props;

  const [form] = Form.useForm();
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const IAuthState = useSelector(AuthSelector);
  const { role } = IAuthState;

  useEffect(() => {
    /**
     * Init form.
     */
    if (dataSet) {
      if (dataSet._id) {
        initFormFields(
          {
            ...dataSet,
            username: dataSet.username,
            verified: dataSet.verified,
            organization: dataSet.organization,
          },
          form
        );
      }
    }
  }, [dataSet]);

  const fields = [
    {
      type: "text",
      name: "username",
      id: "username",
      disabled: false,
      placeHolder: "Username",
      label: "Username",
      required: true,
      hidden: false,
    },
    {
      type: "email",
      name: "email",
      id: "email",
      disabled: dataSet?._id !== undefined,
      placeHolder: "Email",
      label: "Email",
      required: true,
      hidden: false,
    },
    {
      type: "number",
      name: "phone",
      id: "phoone",
      placeHolder: "Phone No",
      label: "Phone No",
      required: true,
    },
  ];

  /**
   * form clear handler onclose
   *
   * @returns {void} handler close
   */
  const handleClose: any = () => {
    props.setModalVisibility(false);
    if (dataSet?._id) {
      form.resetFields();
      form.setFieldValue("id", undefined);
      setDataSet(undefined);
    }
  };

  /**
   * submit handler
   *
   * @param {IUserAddEditFormData} values data on submission
   * @returns {void} submit handler
   */
  const handleSubmit = async (values: IUserAddEditFormData) => {
    setLoading(true);
    if (await dispatch(addUpdateUser(values)).unwrap()) {
      handleClose();
    }
    setLoading(false);
  };
  return (
    <>
      <CustomModal
        centered
        closable={true}
        destroyOnClose={true}
        onCancel={handleClose}
        open={props.modalVisibility}
        setModalVisibility={props.setModalVisibility}
        width={!sm ? "100%" : "30%"}
        footer={null}
      >
        <ScalableCard
          bordered={false}
          title={`${props.edit ? "Edit" : "Add"} User`}
          titlealign="center"
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <Form.Item
              id={"id"}
              name={"id"}
              hidden
              initialValue={dataSet?._id}
            />
            <Row gutter={10} justify={"space-between"}>
              {fields
                .filter((field) => {
                  return !field.hidden;
                })
                .map((field, index) => {
                  return (
                    <Col key={index} xs={24} sm={24} md={12} lg={12}>
                      <Form.Item
                        id={field.name}
                        name={field.name}
                        label={field.label}
                        rules={[
                          {
                            message: `${field.placeHolder} is required!`,
                            required: field.required,
                          },
                        ]}
                      >
                        <ScalableInput
                          id={field.id}
                          size="middle"
                          variant="filled"
                          type={field.type}
                          name={field.name}
                          disabled={field.disabled}
                          placeholder={field.placeHolder}
                          maxLength={InputLength.DYNAMIC_INPUTS_LENGTH}
                        />
                      </Form.Item>
                     </Col>
                  );
                })}

                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    required={true}
                    name={"role"}
                    label={"Roles"}
                    rules={[{ message: `Role is required!`, required: true }]}
                  >
                    <CustomDropdown
                      variant="filled"
                      placeholder={"Select Role..."}
                      options={Object.keys(UserRoles)?.map((key) => {
                        return {
                          label:
                            key.charAt(0).toUpperCase() +
                            key.slice(1).toLowerCase(),
                          value: UserRoles[key as keyof typeof UserRoles],
                        };
                      })}
                    />
                  </Form.Item>
                 </Col>
              <Col xs={24} sm={24} md={12}>
                <center>
                  <Form.Item
                    label={"Account Verified"}
                    id={"verified"}
                    name={"verified"}
                    initialValue={false}
                    rules={[{ message: `Status is required!`, required: true }]}
                  >
                    <Switch />
                  </Form.Item>
                </center>
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <ScalableButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  {props.edit ? "Update" : "Submit"}
                </ScalableButton>
              </Col>
            </Row>
          </Form>
        </ScalableCard>
      </CustomModal>
    </>
  );
};

export default UserAddEditModal;
