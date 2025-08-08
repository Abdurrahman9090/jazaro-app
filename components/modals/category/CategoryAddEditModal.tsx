import React, { useEffect, useState } from "react";
import { Col, Form, Grid, Row, Select } from "antd";

import { initFormFields } from "@/utils";
import ScalableCard from "@/components/card";
import CustomModal from "@/components/modal";
import { InputLength } from "@/types";
import ScalableInput from "@/components/input";
import ScalableButton from "@/components/button";
import { ICategoryModalProps } from "./types";
// redux
import { useAppDispatch } from "@/redux/store";
import { addEditCategory } from "@/redux/actions/categoryAction";
import { ICategory } from "@/types/reduxTypes/category";

/**
 * category add/edit modal dialog
 *
 *
 * @param {ICategoryModalProps} props - props of modal
 * @returns {React.FC} category modal dialog
 */
const CategoryAddEditModal: React.FC<ICategoryModalProps> = (
  props: ICategoryModalProps
) => {
  const { useBreakpoint } = Grid;

  const { dataSet, setDataSet } = props;

  const [form] = Form.useForm();
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /**
     * Init form.
     */
    if (dataSet) {
      if (dataSet._id) {
        initFormFields(
          {
            ...dataSet,
            name: dataSet.name,
            subCategories: dataSet.subCategories || [],
          },
          form
        );
      }
    }
  }, [dataSet]);

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
   * @param {ICategory} values data on submission
   * @returns {void} submit handler
   */
  const handleSubmit = async (values: ICategory) => {
    setLoading(true);
    if (await dispatch(addEditCategory(values)).unwrap()) {
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
          title={`${props.edit ? "Edit" : "Add"} Category`}
          titlealign="center"
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <Form.Item
              id={"_id"}
              name={"_id"}
              hidden
              initialValue={dataSet?._id}
            />
            <Row gutter={10} justify={"space-between"}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  id="name"
                  name="name"
                  label="Category Name"
                  rules={[
                    {
                      message: "Category name is required!",
                      required: true,
                    },
                  ]}
                >
                  <ScalableInput
                    id="name"
                    size="middle"
                    variant="filled"
                    type="text"
                    name="name"
                    disabled={false}
                    placeholder="Enter category name"
                    maxLength={InputLength.DYNAMIC_INPUTS_LENGTH}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  id="subCategories"
                  name="subCategories"
                  label="Sub Categories"
                  rules={[
                    {
                      message: "Sub categories are required!",
                      required: true,
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    variant="filled"
                    placeholder={
                      props.edit
                        ? "Select sub categories..."
                        : "Add sub categories (type and press Enter)"
                    }
                    style={{ width: "100%" }}
                    options={
                      props.edit && dataSet?.subCategories
                        ? dataSet.subCategories.map((category: string) => ({
                            label: category,
                            value: category,
                          }))
                        : []
                    }
                  />
                </Form.Item>
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

export default CategoryAddEditModal;
