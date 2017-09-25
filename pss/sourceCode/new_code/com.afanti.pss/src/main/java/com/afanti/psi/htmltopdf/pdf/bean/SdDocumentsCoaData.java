package com.afanti.psi.htmltopdf.pdf.bean;

import com.afanti.psi.htmltopdf.pdf.AbstractDocumentVo;
import java.io.Serializable;
import java.util.Date;

/**
 * @ClassName: SdDocumentsCoaData
 * @Description: sd_documents_coa_data表对应的java bean类:实单COA文档数据
 * @author AFT · 杨书元
 * @version 1.0 2016-12-21
 */
public class SdDocumentsCoaData extends AbstractDocumentVo implements Serializable {
    private int enter_id;
    private String enter_name;
    private int enter_type;
    private int oper_id;
    private Date oper_time;
    private String desc;
    private int enter_type_billno;
    private int enter_isdel;
    private String batch_no;//批次号
    private String p_pack;//规格
    private String p_unit;//单位
    private int amount;//入库量
    private String create_oper;//经手人
    private Date enter_date;//入库时间
    private String product_name_en;//成品名称

    public String getProduct_name_en() {
        return product_name_en;
    }

    public void setProduct_name_en(String product_name_en) {
        this.product_name_en = product_name_en;
    }

    public int getEnter_id() {
        return enter_id;
    }

    public void setEnter_id(int enter_id) {
        this.enter_id = enter_id;
    }

    public String getEnter_name() {
        return enter_name;
    }

    public void setEnter_name(String enter_name) {
        this.enter_name = enter_name;
    }

    public int getEnter_type() {
        return enter_type;
    }

    public void setEnter_type(int enter_type) {
        this.enter_type = enter_type;
    }

    public int getOper_id() {
        return oper_id;
    }

    public void setOper_id(int oper_id) {
        this.oper_id = oper_id;
    }

    public Date getOper_time() {
        return oper_time;
    }

    public void setOper_time(Date oper_time) {
        this.oper_time = oper_time;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getEnter_type_billno() {
        return enter_type_billno;
    }

    public void setEnter_type_billno(int enter_type_billno) {
        this.enter_type_billno = enter_type_billno;
    }

    public int getEnter_isdel() {
        return enter_isdel;
    }

    public void setEnter_isdel(int enter_isdel) {
        this.enter_isdel = enter_isdel;
    }

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }

    public String getP_pack() {
        return p_pack;
    }

    public void setP_pack(String p_pack) {
        this.p_pack = p_pack;
    }

    public String getP_unit() {
        return p_unit;
    }

    public void setP_unit(String p_unit) {
        this.p_unit = p_unit;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCreate_oper() {
        return create_oper;
    }

    public void setCreate_oper(String create_oper) {
        this.create_oper = create_oper;
    }

    public Date getEnter_date() {
        return enter_date;
    }

    public void setEnter_date(Date enter_date) {
        this.enter_date = enter_date;
    }

    /**
     * @Fields sd_documents_coa_data.sd_id :实单编码
     */
    private Integer sdId;
    /**
     * @Fields sd_documents_coa_data.sd_lock :实单加密编码
     */
    private String sdLock;
    /**
     * @Fields sd_documents_coa_data.name_en :英文名称
     */
    private String nameEn;
    /**
     * @Fields sd_documents_coa_data.cas :cas
     */
    private String cas;
    /**
     * @Fields sd_documents_coa_data.batch_no :batchNo
     */
    private String batchNo;
    /**
     * @Fields sd_documents_coa_data.product_no :productNo
     */
    private String productNo;
    /**
     * @Fields sd_documents_coa_data.appearance_specification :appearanceSpecification
     */
    private String appearanceSpecification;
    /**
     * @Fields sd_documents_coa_data.appearance_results :appearanceResults
     */
    private String appearanceResults;
    /**
     * @Fields sd_documents_coa_data.h1_specification :h1Specification
     */
    private String h1Specification;
    /**
     * @Fields sd_documents_coa_data.h1_results :h1Results
     */
    private String h1Results;
    /**
     * @Fields sd_documents_coa_data.c13_specification :c13Specification
     */
    private String c13Specification;
    /**
     * @Fields sd_documents_coa_data.c13_results :c13Results
     */
    private String c13Results;
    /**
     * @Fields sd_documents_coa_data.f19_specification :f19Specification
     */
    private String f19Specification;
    /**
     * @Fields sd_documents_coa_data.f19_results :f19Results
     */
    private String f19Results;
    /**
     * @Fields sd_documents_coa_data.p31_specification :p31Specification
     */
    private String p31Specification;
    /**
     * @Fields sd_documents_coa_data.p31_results :p31Results
     */
    private String p31Results;
    /**
     * @Fields sd_documents_coa_data.mass_spectroscopy_specification :massSpectroscopySpecification
     */
    private String massSpectroscopySpecification;
    /**
     * @Fields sd_documents_coa_data.mass_spectroscopy_results :massSpectroscopyResults
     */
    private String massSpectroscopyResults;
    /**
     * @Fields sd_documents_coa_data.specific_optical_rotation_specification :specificOpticalRotationSpecification
     */
    private String specificOpticalRotationSpecification;
    /**
     * @Fields sd_documents_coa_data.specific_optical_rotation_results :specificOpticalRotationResults
     */
    private String specificOpticalRotationResults;
    /**
     * @Fields sd_documents_coa_data.purity_specification :puritySpecification
     */
    private String puritySpecification;
    /**
     * @Fields sd_documents_coa_data.purity_results :purityResults
     */
    private String purityResults;
    /**
     * @Fields sd_documents_coa_data.tu_pu :tuPu
     */
    private String tuPu;
    /**
     * @Fields sd_documents_coa_data.enantiomeric_specification :enantiomericSpecification
     */
    private String enantiomericSpecification;
    /**
     * @Fields sd_documents_coa_data.enantiomeric_results :enantiomericResults
     */
    private String enantiomericResults;
    
    private String enantiomericExcess;
    /**
     * @Fields sd_documents_coa_data.water_content_specification :waterContentSpecification
     */
    private String waterContentSpecification;
    /**
     * @Fields sd_documents_coa_data.water_content_results :waterContentResults
     */
    private String waterContentResults;
    /**
     * @Fields sd_documents_coa_data.date_of_manufacture :dateOfManufacture
     */
    private String dateOfManufacture;
    /**
     * @Fields sd_documents_coa_data.date_of_analysis :dateOfAnalysis
     */
    private String dateOfAnalysis;
    /**
     * @Fields sd_documents_coa_data.recommended_retest_date :recommendedRetestDate
     */
    private String recommendedRetestDate;
    /**
     * @Fields sd_documents_coa_data.create_oper :createOper
     */
    private String createOper;
    /**
     * @Fields sd_documents_coa_data.date :date
     */
    private String date;
    /**
     * @Fields sd_documents_coa_data.remark :remark
     */
    private String remark;
    /**
     * @Fields sd_documents_coa_data.declaraction :declaraction
     */
    private String declaraction;
    private static final long serialVersionUID = 1L;

	/**
	 * 图片存放路径
	 */
	private String imagePath;
    /**
     * @return sd_documents_coa_data.sd_id : 返回 实单编码
     */
    public Integer getSdId() {
        return sdId;
    }
    /**
     * @param sdId of sd_documents_coa_data : 设置 实单编码
     */
    public void setSdId(Integer sdId) {
        this.sdId = sdId;
    }
    /**
     * @return sd_documents_coa_data.sd_lock : 返回 实单加密编码
     */
    public String getSdLock() {
        return sdLock;
    }
    /**
     * @param sdLock of sd_documents_coa_data : 设置 实单加密编码
     */
    public void setSdLock(String sdLock) {
        this.sdLock = sdLock == null ? null : sdLock.trim();
    }
    /**
     * @return sd_documents_coa_data.name_en : 返回 英文名称
     */
    public String getNameEn() {
        return nameEn;
    }
    /**
     * @param nameEn of sd_documents_coa_data : 设置 英文名称
     */
    public void setNameEn(String nameEn) {
        this.nameEn = nameEn == null ? null : nameEn.trim();
    }
    /**
     * @return sd_documents_coa_data.cas : 返回 cas
     */
    public String getCas() {
        return cas;
    }
    /**
     * @param cas of sd_documents_coa_data : 设置 cas
     */
    public void setCas(String cas) {
        this.cas = cas == null ? null : cas.trim();
    }
    /**
     * @return sd_documents_coa_data.batch_no : 返回 batchNo
     */
    public String getBatchNo() {
        return batchNo;
    }
    /**
     * @param batchNo of sd_documents_coa_data : 设置 batchNo
     */
    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo == null ? null : batchNo.trim();
    }
    /**
     * @return sd_documents_coa_data.product_no : 返回 productNo
     */
    public String getProductNo() {
        return productNo;
    }
    /**
     * @param productNo of sd_documents_coa_data : 设置 productNo
     */
    public void setProductNo(String productNo) {
        this.productNo = productNo == null ? null : productNo.trim();
    }
    /**
     * @return sd_documents_coa_data.appearance_specification : 返回 appearanceSpecification
     */
    public String getAppearanceSpecification() {
        return appearanceSpecification;
    }
    /**
     * @param appearanceSpecification of sd_documents_coa_data : 设置 appearanceSpecification
     */
    public void setAppearanceSpecification(String appearanceSpecification) {
        this.appearanceSpecification = appearanceSpecification == null ? null : appearanceSpecification.trim();
    }
    /**
     * @return sd_documents_coa_data.appearance_results : 返回 appearanceResults
     */
    public String getAppearanceResults() {
        return appearanceResults;
    }
    /**
     * @param appearanceResults of sd_documents_coa_data : 设置 appearanceResults
     */
    public void setAppearanceResults(String appearanceResults) {
        this.appearanceResults = appearanceResults == null ? null : appearanceResults.trim();
    }
    /**
     * @return sd_documents_coa_data.h1_specification : 返回 h1Specification
     */
    public String getH1Specification() {
        return h1Specification;
    }
    /**
     * @param h1Specification of sd_documents_coa_data : 设置 h1Specification
     */
    public void setH1Specification(String h1Specification) {
        this.h1Specification = h1Specification == null ? null : h1Specification.trim();
    }
    /**
     * @return sd_documents_coa_data.h1_results : 返回 h1Results
     */
    public String getH1Results() {
        return h1Results;
    }
    /**
     * @param h1Results of sd_documents_coa_data : 设置 h1Results
     */
    public void setH1Results(String h1Results) {
        this.h1Results = h1Results == null ? null : h1Results.trim();
    }
    /**
     * @return sd_documents_coa_data.c13_specification : 返回 c13Specification
     */
    public String getC13Specification() {
        return c13Specification;
    }
    /**
     * @param c13Specification of sd_documents_coa_data : 设置 c13Specification
     */
    public void setC13Specification(String c13Specification) {
        this.c13Specification = c13Specification == null ? null : c13Specification.trim();
    }
    /**
     * @return sd_documents_coa_data.c13_results : 返回 c13Results
     */
    public String getC13Results() {
        return c13Results;
    }
    /**
     * @param c13Results of sd_documents_coa_data : 设置 c13Results
     */
    public void setC13Results(String c13Results) {
        this.c13Results = c13Results == null ? null : c13Results.trim();
    }
    /**
     * @return sd_documents_coa_data.f19_specification : 返回 f19Specification
     */
    public String getF19Specification() {
        return f19Specification;
    }
    /**
     * @param f19Specification of sd_documents_coa_data : 设置 f19Specification
     */
    public void setF19Specification(String f19Specification) {
        this.f19Specification = f19Specification == null ? null : f19Specification.trim();
    }
    /**
     * @return sd_documents_coa_data.f19_results : 返回 f19Results
     */
    public String getF19Results() {
        return f19Results;
    }
    /**
     * @param f19Results of sd_documents_coa_data : 设置 f19Results
     */
    public void setF19Results(String f19Results) {
        this.f19Results = f19Results == null ? null : f19Results.trim();
    }
    /**
     * @return sd_documents_coa_data.p31_specification : 返回 p31Specification
     */
    public String getP31Specification() {
        return p31Specification;
    }
    /**
     * @param p31Specification of sd_documents_coa_data : 设置 p31Specification
     */
    public void setP31Specification(String p31Specification) {
        this.p31Specification = p31Specification == null ? null : p31Specification.trim();
    }
    /**
     * @return sd_documents_coa_data.p31_results : 返回 p31Results
     */
    public String getP31Results() {
        return p31Results;
    }
    /**
     * @param p31Results of sd_documents_coa_data : 设置 p31Results
     */
    public void setP31Results(String p31Results) {
        this.p31Results = p31Results == null ? null : p31Results.trim();
    }
    /**
     * @return sd_documents_coa_data.mass_spectroscopy_specification : 返回 massSpectroscopySpecification
     */
    public String getMassSpectroscopySpecification() {
        return massSpectroscopySpecification;
    }
    /**
     * @param massSpectroscopySpecification of sd_documents_coa_data : 设置 massSpectroscopySpecification
     */
    public void setMassSpectroscopySpecification(String massSpectroscopySpecification) {
        this.massSpectroscopySpecification = massSpectroscopySpecification == null ? null : massSpectroscopySpecification.trim();
    }
    /**
     * @return sd_documents_coa_data.mass_spectroscopy_results : 返回 massSpectroscopyResults
     */
    public String getMassSpectroscopyResults() {
        return massSpectroscopyResults;
    }
    /**
     * @param massSpectroscopyResults of sd_documents_coa_data : 设置 massSpectroscopyResults
     */
    public void setMassSpectroscopyResults(String massSpectroscopyResults) {
        this.massSpectroscopyResults = massSpectroscopyResults == null ? null : massSpectroscopyResults.trim();
    }
    /**
     * @return sd_documents_coa_data.specific_optical_rotation_specification : 返回 specificOpticalRotationSpecification
     */
    public String getSpecificOpticalRotationSpecification() {
        return specificOpticalRotationSpecification;
    }
    /**
     * @param specificOpticalRotationSpecification of sd_documents_coa_data : 设置 specificOpticalRotationSpecification
     */
    public void setSpecificOpticalRotationSpecification(String specificOpticalRotationSpecification) {
        this.specificOpticalRotationSpecification = specificOpticalRotationSpecification == null ? null : specificOpticalRotationSpecification.trim();
    }
    /**
     * @return sd_documents_coa_data.specific_optical_rotation_results : 返回 specificOpticalRotationResults
     */
    public String getSpecificOpticalRotationResults() {
        return specificOpticalRotationResults;
    }
    /**
     * @param specificOpticalRotationResults of sd_documents_coa_data : 设置 specificOpticalRotationResults
     */
    public void setSpecificOpticalRotationResults(String specificOpticalRotationResults) {
        this.specificOpticalRotationResults = specificOpticalRotationResults == null ? null : specificOpticalRotationResults.trim();
    }
    /**
     * @return sd_documents_coa_data.purity_specification : 返回 puritySpecification
     */
    public String getPuritySpecification() {
        return puritySpecification;
    }
    /**
     * @param puritySpecification of sd_documents_coa_data : 设置 puritySpecification
     */
    public void setPuritySpecification(String puritySpecification) {
        this.puritySpecification = puritySpecification == null ? null : puritySpecification.trim();
    }
    /**
     * @return sd_documents_coa_data.purity_results : 返回 purityResults
     */
    public String getPurityResults() {
        return purityResults;
    }
    /**
     * @param purityResults of sd_documents_coa_data : 设置 purityResults
     */
    public void setPurityResults(String purityResults) {
        this.purityResults = purityResults == null ? null : purityResults.trim();
    }
    /**
     * @return sd_documents_coa_data.tu_pu : 返回 tuPu
     */
    public String getTuPu() {
        return tuPu;
    }
    /**
     * @param tuPu of sd_documents_coa_data : 设置 tuPu
     */
    public void setTuPu(String tuPu) {
        this.tuPu = tuPu == null ? null : tuPu.trim();
    }
    /**
     * @return sd_documents_coa_data.enantiomeric_specification : 返回 enantiomericSpecification
     */
    public String getEnantiomericSpecification() {
        return enantiomericSpecification;
    }
    /**
     * @param enantiomericSpecification of sd_documents_coa_data : 设置 enantiomericSpecification
     */
    public void setEnantiomericSpecification(String enantiomericSpecification) {
        this.enantiomericSpecification = enantiomericSpecification == null ? null : enantiomericSpecification.trim();
    }
    /**
     * @return sd_documents_coa_data.enantiomeric_results : 返回 enantiomericResults
     */
    public String getEnantiomericResults() {
        return enantiomericResults;
    }
    /**
     * @param enantiomericResults of sd_documents_coa_data : 设置 enantiomericResults
     */
    public void setEnantiomericResults(String enantiomericResults) {
        this.enantiomericResults = enantiomericResults == null ? null : enantiomericResults.trim();
    }
    /**
     * @return sd_documents_coa_data.water_content_specification : 返回 waterContentSpecification
     */
    public String getWaterContentSpecification() {
        return waterContentSpecification;
    }
    /**
     * @param waterContentSpecification of sd_documents_coa_data : 设置 waterContentSpecification
     */
    public void setWaterContentSpecification(String waterContentSpecification) {
        this.waterContentSpecification = waterContentSpecification == null ? null : waterContentSpecification.trim();
    }
    /**
     * @return sd_documents_coa_data.water_content_results : 返回 waterContentResults
     */
    public String getWaterContentResults() {
        return waterContentResults;
    }
    /**
     * @param waterContentResults of sd_documents_coa_data : 设置 waterContentResults
     */
    public void setWaterContentResults(String waterContentResults) {
        this.waterContentResults = waterContentResults == null ? null : waterContentResults.trim();
    }
    /**
     * @return sd_documents_coa_data.date_of_manufacture : 返回 dateOfManufacture
     */
    public String getDateOfManufacture() {
        return dateOfManufacture;
    }
    /**
     * @param dateOfManufacture of sd_documents_coa_data : 设置 dateOfManufacture
     */
    public void setDateOfManufacture(String dateOfManufacture) {
        this.dateOfManufacture = dateOfManufacture == null ? null : dateOfManufacture.trim();
    }
    /**
     * @return sd_documents_coa_data.date_of_analysis : 返回 dateOfAnalysis
     */
    public String getDateOfAnalysis() {
        return dateOfAnalysis;
    }
    /**
     * @param dateOfAnalysis of sd_documents_coa_data : 设置 dateOfAnalysis
     */
    public void setDateOfAnalysis(String dateOfAnalysis) {
        this.dateOfAnalysis = dateOfAnalysis == null ? null : dateOfAnalysis.trim();
    }
    /**
     * @return sd_documents_coa_data.recommended_retest_date : 返回 recommendedRetestDate
     */
    public String getRecommendedRetestDate() {
        return recommendedRetestDate;
    }
    /**
     * @param recommendedRetestDate of sd_documents_coa_data : 设置 recommendedRetestDate
     */
    public void setRecommendedRetestDate(String recommendedRetestDate) {
        this.recommendedRetestDate = recommendedRetestDate == null ? null : recommendedRetestDate.trim();
    }
    /**
     * @return sd_documents_coa_data.create_oper : 返回 createOper
     */
    public String getCreateOper() {
        return createOper;
    }
    /**
     * @param createOper of sd_documents_coa_data : 设置 createOper
     */
    public void setCreateOper(String createOper) {
        this.createOper = createOper == null ? null : createOper.trim();
    }
    /**
     * @return sd_documents_coa_data.date : 返回 date
     */
    public String getDate() {
        return date;
    }
    /**
     * @param date of sd_documents_coa_data : 设置 date
     */
    public void setDate(String date) {
        this.date = date == null ? null : date.trim();
    }
    /**
     * @return sd_documents_coa_data.remark : 返回 remark
     */
    public String getRemark() {
        return remark;
    }
    /**
     * @param remark of sd_documents_coa_data : 设置 remark
     */
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
    /**
     * @return sd_documents_coa_data.declaraction : 返回 declaraction
     */
    public String getDeclaraction() {
        return declaraction;
    }
    /**
     * @param declaraction of sd_documents_coa_data : 设置 declaraction
     */
    public void setDeclaraction(String declaraction) {
        this.declaraction = declaraction == null ? null : declaraction.trim();
    }
	@Override
	public String findPrimaryKey() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getEnantiomericExcess() {
		return enantiomericExcess;
	}
	public void setEnantiomericExcess(String enantiomericExcess) {
		this.enantiomericExcess = enantiomericExcess;
	}
}