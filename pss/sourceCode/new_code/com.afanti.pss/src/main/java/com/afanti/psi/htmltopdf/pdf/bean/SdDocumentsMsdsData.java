package com.afanti.psi.htmltopdf.pdf.bean;

import com.afanti.psi.htmltopdf.pdf.AbstractDocumentVo;
import java.io.Serializable;

/**
 * @ClassName: SdDocumentsMsdsData
 * @Description: sd_documents_msds_data表对应的java bean类:实单MSDS文档数据
 * @author AFT · 杨书元
 * @version 1.0 2016-12-21
 */
public class SdDocumentsMsdsData extends AbstractDocumentVo implements Serializable {

    /**
     * @Fields sd_documents_msds_data.sd_id :实单编码
     */
    private Integer sdId;

	private String sdCode;
    /**
     * @Fields sd_documents_msds_data.sd_lock :实单加密编码
     */
    private String sdLock;
    /**
     * @Fields sd_documents_msds_data.name_en :英文名称
     */
    private String nameEn;
    /**
     * @Fields sd_documents_msds_data.cas :cas
     */
    private String cas;
    /**
     * @Fields sd_documents_msds_data.synonyms :synonyms
     */
    private String synonyms;
    /**
     * @Fields sd_documents_msds_data.chemica_family :chemicalFamily
     */
    private String chemicalFamily;
    private String [] chemicalFamilys;
    /**
     * @Fields sd_documents_msds_data.molecular_weight :molecularWeight
     */
    private String molecularWeight;
    /**
     * @Fields sd_documents_msds_data.molecular_formula :molecularFormula
     */
    private String molecularFormula;
    /**
     * @Fields sd_documents_msds_data.purity :purity
     */
    private String purity;
    /**
     * @Fields sd_documents_msds_data.hazard_identification :hazardIdentification
     */
    private String hazardIdentification;
    /**
     * @Fields sd_documents_msds_data.label_elements :labelElements
     */
    private String labelElements;
    /**
     * @Fields sd_documents_msds_data.pictogram :pictogram
     */
    private String pictogram;
    /**
     * @Fields sd_documents_msds_data.eyes_exposure :eyesExposure
     */
    private String eyesExposure;
    /**
     * @Fields sd_documents_msds_data.skin_exposure :skinExposure
     */
    private String skinExposure;
    /**
     * @Fields sd_documents_msds_data.inhalation :inhalation
     */
    private String inhalation;
    /**
     * @Fields sd_documents_msds_data.ingestion :ingestion
     */
    private String ingestion;
    /**
     * @Fields sd_documents_msds_data.flash_point :flashPoint
     */
    private String flashPoint;
    /**
     * @Fields sd_documents_msds_data.autoignition_temperature :autoignitionTemperature
     */
    private String autoignitionTemperature;
    /**
     * @Fields sd_documents_msds_data.explosion_limits :explosionLimits
     */
    private String explosionLimits;
    /**
     * @Fields sd_documents_msds_data.personal_protection :personalProtection
     */
    private String personalProtection;
    /**
     * @Fields sd_documents_msds_data.extinguishing_medium :extinguishingMedium
     */
    private String extinguishingMedium;
    /**
     * @Fields sd_documents_msds_data.special_precautions :specialPrecautions
     */
    private String specialPrecautions;
    /**
     * @Fields sd_documents_msds_data.accidental_release_measures :accidentalReleaseMeasures
     */
    private String accidentalReleaseMeasures;
    /**
     * @Fields sd_documents_msds_data.handling_and_storage :handlingAndStorage
     */
    private String handlingAndStorage;
    /**
     * @Fields sd_documents_msds_data.exposure_controls :exposureControls
     */
    private String exposureControls;
    /**
     * @Fields sd_documents_msds_data.appearance :appearance
     */
    private String appearance;
    /**
     * @Fields sd_documents_msds_data.odour :odour
     */
    private String odour;
    /**
     * @Fields sd_documents_msds_data.ph :ph
     */
    private String ph;
    /**
     * @Fields sd_documents_msds_data.melting_point :meltingPoint
     */
    private String meltingPoint;
    /**
     * @Fields sd_documents_msds_data.boiling_point :boilingPoint
     */
    private String boilingPoint;
    /**
     * @Fields sd_documents_msds_data.chemical_stability :chemicalStability
     */
    private String chemicalStability;
    /**
     * @Fields sd_documents_msds_data.incompatibilities_with_other_materials :incompatibilitiesWithOtherMaterials
     */
    private String incompatibilitiesWithOtherMaterials;
    /**
     * @Fields sd_documents_msds_data.hazardous_combustion_or_decomposition_products :hazardousCombustionOrDecompositionProducts
     */
    private String hazardousCombustionOrDecompositionProducts;
    /**
     * @Fields sd_documents_msds_data.toxicology :toxicology
     */
    private String toxicology;
    /**
     * @Fields sd_documents_msds_data.ecology :ecology
     */
    private String ecology;
    /**
     * @Fields sd_documents_msds_data.disposal :disposal
     */
    private String disposal;
    /**
     * @Fields sd_documents_msds_data.shipping_name :shippingName
     */
    private String shippingName;
    /**
     * @Fields sd_documents_msds_data.hazard_class :hazardClass
     */
    private String hazardClass;
    /**
     * @Fields sd_documents_msds_data.un_id_number :unIdNumber
     */
    private String unIdNumber;
    /**
     * @Fields sd_documents_msds_data.packing_group :packingGroup
     */
    private String packingGroup;
    /**
     * @Fields sd_documents_msds_data.regulatory_information :regulatoryInformation
     */
    private String regulatoryInformation;
    /**
     * @Fields sd_documents_msds_data.liability :liability
     */
    private String liability;
    /**
     * @Fields sd_documents_msds_data.preparation_date :preparationDate
     */
    private String preparationDate;
    /**
     * @Fields sd_documents_msds_data.revision_ate :revisionDate
     */
    private String revisionDate;
    private static final long serialVersionUID = 1L;

	/**
	 * 图片存放路径
	 */
	private String imagePath;
    /**
     * @return sd_documents_msds_data.sd_id : 返回 实单编码
     */
    public Integer getSdId() {
        return sdId;
    }
    /**
     * @param sdId of sd_documents_msds_data : 设置 实单编码
     */
    public void setSdId(Integer sdId) {
        this.sdId = sdId;
    }
    /**
     * @return sd_documents_msds_data.sd_lock : 返回 实单加密编码
     */
    public String getSdLock() {
        return sdLock;
    }
    /**
     * @param sdLock of sd_documents_msds_data : 设置 实单加密编码
     */
    public void setSdLock(String sdLock) {
        this.sdLock = sdLock == null ? null : sdLock.trim();
    }
    /**
     * @return sd_documents_msds_data.name_en : 返回 英文名称
     */
    public String getNameEn() {
        return nameEn;
    }
    /**
     * @param nameEn of sd_documents_msds_data : 设置 英文名称
     */
    public void setNameEn(String nameEn) {
        this.nameEn = nameEn == null ? null : nameEn.trim();
    }
    /**
     * @return sd_documents_msds_data.cas : 返回 cas
     */
    public String getCas() {
        return cas;
    }
    /**
     * @param cas of sd_documents_msds_data : 设置 cas
     */
    public void setCas(String cas) {
        this.cas = cas == null ? null : cas.trim();
    }
    /**
     * @return sd_documents_msds_data.synonyms : 返回 synonyms
     */
    public String getSynonyms() {
        return synonyms;
    }
    /**
     * @param synonyms of sd_documents_msds_data : 设置 synonyms
     */
    public void setSynonyms(String synonyms) {
        this.synonyms = synonyms == null ? null : synonyms.trim();
    }
    /**
     * @return sd_documents_msds_data.chemica_family : 返回 chemicalFamily
     */
    public String getChemicalFamily() {
        return chemicalFamily;
    }

    public void setChemicalFamily(String chemicalFamily) {
        this.chemicalFamily = chemicalFamily == null ? null : chemicalFamily.trim();
    }
    /**
     * @return sd_documents_msds_data.molecular_weight : 返回 molecularWeight
     */
    public String getMolecularWeight() {
        return molecularWeight;
    }
    /**
     * @param molecularWeight of sd_documents_msds_data : 设置 molecularWeight
     */
    public void setMolecularWeight(String molecularWeight) {
        this.molecularWeight = molecularWeight == null ? null : molecularWeight.trim();
    }
    /**
     * @return sd_documents_msds_data.molecular_formula : 返回 molecularFormula
     */
    public String getMolecularFormula() {
        return molecularFormula;
    }
    /**
     * @param molecularFormula of sd_documents_msds_data : 设置 molecularFormula
     */
    public void setMolecularFormula(String molecularFormula) {
        this.molecularFormula = molecularFormula == null ? null : molecularFormula.trim();
    }
    /**
     * @return sd_documents_msds_data.purity : 返回 purity
     */
    public String getPurity() {
        return purity;
    }
    /**
     * @param purity of sd_documents_msds_data : 设置 purity
     */
    public void setPurity(String purity) {
        this.purity = purity == null ? null : purity.trim();
    }
    /**
     * @return sd_documents_msds_data.hazard_identification : 返回 hazardIdentification
     */
    public String getHazardIdentification() {
        return hazardIdentification;
    }
    /**
     * @param hazardIdentification of sd_documents_msds_data : 设置 hazardIdentification
     */
    public void setHazardIdentification(String hazardIdentification) {
        this.hazardIdentification = hazardIdentification == null ? null : hazardIdentification.trim();
    }
    /**
     * @return sd_documents_msds_data.label_elements : 返回 labelElements
     */
    public String getLabelElements() {
        return labelElements;
    }
    /**
     * @param labelElements of sd_documents_msds_data : 设置 labelElements
     */
    public void setLabelElements(String labelElements) {
        this.labelElements = labelElements == null ? null : labelElements.trim();
    }
    /**
     * @return sd_documents_msds_data.pictogram : 返回 pictogram
     */
    public String getPictogram() {
        return pictogram;
    }
    /**
     * @param pictogram of sd_documents_msds_data : 设置 pictogram
     */
    public void setPictogram(String pictogram) {
        this.pictogram = pictogram == null ? null : pictogram.trim();
    }
    /**
     * @return sd_documents_msds_data.eyes_exposure : 返回 eyesExposure
     */
    public String getEyesExposure() {
        return eyesExposure;
    }
    /**
     * @param eyesExposure of sd_documents_msds_data : 设置 eyesExposure
     */
    public void setEyesExposure(String eyesExposure) {
        this.eyesExposure = eyesExposure == null ? null : eyesExposure.trim();
    }
    /**
     * @return sd_documents_msds_data.skin_exposure : 返回 skinExposure
     */
    public String getSkinExposure() {
        return skinExposure;
    }
    /**
     * @param skinExposure of sd_documents_msds_data : 设置 skinExposure
     */
    public void setSkinExposure(String skinExposure) {
        this.skinExposure = skinExposure == null ? null : skinExposure.trim();
    }
    /**
     * @return sd_documents_msds_data.inhalation : 返回 inhalation
     */
    public String getInhalation() {
        return inhalation;
    }
    /**
     * @param inhalation of sd_documents_msds_data : 设置 inhalation
     */
    public void setInhalation(String inhalation) {
        this.inhalation = inhalation == null ? null : inhalation.trim();
    }
    /**
     * @return sd_documents_msds_data.ingestion : 返回 ingestion
     */
    public String getIngestion() {
        return ingestion;
    }
    /**
     * @param ingestion of sd_documents_msds_data : 设置 ingestion
     */
    public void setIngestion(String ingestion) {
        this.ingestion = ingestion == null ? null : ingestion.trim();
    }
    /**
     * @return sd_documents_msds_data.flash_point : 返回 flashPoint
     */
    public String getFlashPoint() {
        return flashPoint;
    }
    /**
     * @param flashPoint of sd_documents_msds_data : 设置 flashPoint
     */
    public void setFlashPoint(String flashPoint) {
        this.flashPoint = flashPoint == null ? null : flashPoint.trim();
    }
    /**
     * @return sd_documents_msds_data.autoignition_temperature : 返回 autoignitionTemperature
     */
    public String getAutoignitionTemperature() {
        return autoignitionTemperature;
    }
    /**
     * @param autoignitionTemperature of sd_documents_msds_data : 设置 autoignitionTemperature
     */
    public void setAutoignitionTemperature(String autoignitionTemperature) {
        this.autoignitionTemperature = autoignitionTemperature == null ? null : autoignitionTemperature.trim();
    }
    /**
     * @return sd_documents_msds_data.explosion_limits : 返回 explosionLimits
     */
    public String getExplosionLimits() {
        return explosionLimits;
    }
    /**
     * @param explosionLimits of sd_documents_msds_data : 设置 explosionLimits
     */
    public void setExplosionLimits(String explosionLimits) {
        this.explosionLimits = explosionLimits == null ? null : explosionLimits.trim();
    }
    /**
     * @return sd_documents_msds_data.personal_protection : 返回 personalProtection
     */
    public String getPersonalProtection() {
        return personalProtection;
    }
    /**
     * @param personalProtection of sd_documents_msds_data : 设置 personalProtection
     */
    public void setPersonalProtection(String personalProtection) {
        this.personalProtection = personalProtection == null ? null : personalProtection.trim();
    }
    /**
     * @return sd_documents_msds_data.extinguishing_medium : 返回 extinguishingMedium
     */
    public String getExtinguishingMedium() {
        return extinguishingMedium;
    }
    /**
     * @param extinguishingMedium of sd_documents_msds_data : 设置 extinguishingMedium
     */
    public void setExtinguishingMedium(String extinguishingMedium) {
        this.extinguishingMedium = extinguishingMedium == null ? null : extinguishingMedium.trim();
    }
    /**
     * @return sd_documents_msds_data.special_precautions : 返回 specialPrecautions
     */
    public String getSpecialPrecautions() {
        return specialPrecautions;
    }
    /**
     * @param specialPrecautions of sd_documents_msds_data : 设置 specialPrecautions
     */
    public void setSpecialPrecautions(String specialPrecautions) {
        this.specialPrecautions = specialPrecautions == null ? null : specialPrecautions.trim();
    }
    /**
     * @return sd_documents_msds_data.accidental_release_measures : 返回 accidentalReleaseMeasures
     */
    public String getAccidentalReleaseMeasures() {
        return accidentalReleaseMeasures;
    }
    /**
     * @param accidentalReleaseMeasures of sd_documents_msds_data : 设置 accidentalReleaseMeasures
     */
    public void setAccidentalReleaseMeasures(String accidentalReleaseMeasures) {
        this.accidentalReleaseMeasures = accidentalReleaseMeasures == null ? null : accidentalReleaseMeasures.trim();
    }
    /**
     * @return sd_documents_msds_data.handling_and_storage : 返回 handlingAndStorage
     */
    public String getHandlingAndStorage() {
        return handlingAndStorage;
    }
    /**
     * @param handlingAndStorage of sd_documents_msds_data : 设置 handlingAndStorage
     */
    public void setHandlingAndStorage(String handlingAndStorage) {
        this.handlingAndStorage = handlingAndStorage == null ? null : handlingAndStorage.trim();
    }
    /**
     * @return sd_documents_msds_data.exposure_controls : 返回 exposureControls
     */
    public String getExposureControls() {
        return exposureControls;
    }
    /**
     * @param exposureControls of sd_documents_msds_data : 设置 exposureControls
     */
    public void setExposureControls(String exposureControls) {
        this.exposureControls = exposureControls == null ? null : exposureControls.trim();
    }
    /**
     * @return sd_documents_msds_data.appearance : 返回 appearance
     */
    public String getAppearance() {
        return appearance;
    }
    /**
     * @param appearance of sd_documents_msds_data : 设置 appearance
     */
    public void setAppearance(String appearance) {
        this.appearance = appearance == null ? null : appearance.trim();
    }
    /**
     * @return sd_documents_msds_data.odour : 返回 odour
     */
    public String getOdour() {
        return odour;
    }
    /**
     * @param odour of sd_documents_msds_data : 设置 odour
     */
    public void setOdour(String odour) {
        this.odour = odour == null ? null : odour.trim();
    }
    /**
     * @return sd_documents_msds_data.ph : 返回 ph
     */
    public String getPh() {
        return ph;
    }
    /**
     * @param ph of sd_documents_msds_data : 设置 ph
     */
    public void setPh(String ph) {
        this.ph = ph == null ? null : ph.trim();
    }
    /**
     * @return sd_documents_msds_data.melting_point : 返回 meltingPoint
     */
    public String getMeltingPoint() {
        return meltingPoint;
    }
    /**
     * @param meltingPoint of sd_documents_msds_data : 设置 meltingPoint
     */
    public void setMeltingPoint(String meltingPoint) {
        this.meltingPoint = meltingPoint == null ? null : meltingPoint.trim();
    }
    /**
     * @return sd_documents_msds_data.boiling_point : 返回 boilingPoint
     */
    public String getBoilingPoint() {
        return boilingPoint;
    }
    /**
     * @param boilingPoint of sd_documents_msds_data : 设置 boilingPoint
     */
    public void setBoilingPoint(String boilingPoint) {
        this.boilingPoint = boilingPoint == null ? null : boilingPoint.trim();
    }
    /**
     * @return sd_documents_msds_data.chemical_stability : 返回 chemicalStability
     */
    public String getChemicalStability() {
        return chemicalStability;
    }
    /**
     * @param chemicalStability of sd_documents_msds_data : 设置 chemicalStability
     */
    public void setChemicalStability(String chemicalStability) {
        this.chemicalStability = chemicalStability == null ? null : chemicalStability.trim();
    }
    /**
     * @return sd_documents_msds_data.incompatibilities_with_other_materials : 返回 incompatibilitiesWithOtherMaterials
     */
    public String getIncompatibilitiesWithOtherMaterials() {
        return incompatibilitiesWithOtherMaterials;
    }
    /**
     * @param incompatibilitiesWithOtherMaterials of sd_documents_msds_data : 设置 incompatibilitiesWithOtherMaterials
     */
    public void setIncompatibilitiesWithOtherMaterials(String incompatibilitiesWithOtherMaterials) {
        this.incompatibilitiesWithOtherMaterials = incompatibilitiesWithOtherMaterials == null ? null : incompatibilitiesWithOtherMaterials.trim();
    }
    /**
     * @return sd_documents_msds_data.hazardous_combustion_or_decomposition_products : 返回 hazardousCombustionOrDecompositionProducts
     */
    public String getHazardousCombustionOrDecompositionProducts() {
        return hazardousCombustionOrDecompositionProducts;
    }
    /**
     * @param hazardousCombustionOrDecompositionProducts of sd_documents_msds_data : 设置 hazardousCombustionOrDecompositionProducts
     */
    public void setHazardousCombustionOrDecompositionProducts(String hazardousCombustionOrDecompositionProducts) {
        this.hazardousCombustionOrDecompositionProducts = hazardousCombustionOrDecompositionProducts == null ? null : hazardousCombustionOrDecompositionProducts.trim();
    }
    /**
     * @return sd_documents_msds_data.toxicology : 返回 toxicology
     */
    public String getToxicology() {
        return toxicology;
    }
    /**
     * @param toxicology of sd_documents_msds_data : 设置 toxicology
     */
    public void setToxicology(String toxicology) {
        this.toxicology = toxicology == null ? null : toxicology.trim();
    }
    /**
     * @return sd_documents_msds_data.ecology : 返回 ecology
     */
    public String getEcology() {
        return ecology;
    }
    /**
     * @param ecology of sd_documents_msds_data : 设置 ecology
     */
    public void setEcology(String ecology) {
        this.ecology = ecology == null ? null : ecology.trim();
    }
    /**
     * @return sd_documents_msds_data.disposal : 返回 disposal
     */
    public String getDisposal() {
        return disposal;
    }
    /**
     * @param disposal of sd_documents_msds_data : 设置 disposal
     */
    public void setDisposal(String disposal) {
        this.disposal = disposal == null ? null : disposal.trim();
    }
    /**
     * @return sd_documents_msds_data.shipping_name : 返回 shippingName
     */
    public String getShippingName() {
        return shippingName;
    }
    /**
     * @param shippingName of sd_documents_msds_data : 设置 shippingName
     */
    public void setShippingName(String shippingName) {
        this.shippingName = shippingName == null ? null : shippingName.trim();
    }
    /**
     * @return sd_documents_msds_data.hazard_class : 返回 hazardClass
     */
    public String getHazardClass() {
        return hazardClass;
    }
    /**
     * @param hazardClass of sd_documents_msds_data : 设置 hazardClass
     */
    public void setHazardClass(String hazardClass) {
        this.hazardClass = hazardClass == null ? null : hazardClass.trim();
    }
    /**
     * @return sd_documents_msds_data.un_id_number : 返回 unIdNumber
     */
    public String getUnIdNumber() {
        return unIdNumber;
    }
    /**
     * @param unIdNumber of sd_documents_msds_data : 设置 unIdNumber
     */
    public void setUnIdNumber(String unIdNumber) {
        this.unIdNumber = unIdNumber == null ? null : unIdNumber.trim();
    }
    /**
     * @return sd_documents_msds_data.packing_group : 返回 packingGroup
     */
    public String getPackingGroup() {
        return packingGroup;
    }
    /**
     * @param packingGroup of sd_documents_msds_data : 设置 packingGroup
     */
    public void setPackingGroup(String packingGroup) {
        this.packingGroup = packingGroup == null ? null : packingGroup.trim();
    }
    /**
     * @return sd_documents_msds_data.regulatory_information : 返回 regulatoryInformation
     */
    public String getRegulatoryInformation() {
        return regulatoryInformation;
    }
    /**
     * @param regulatoryInformation of sd_documents_msds_data : 设置 regulatoryInformation
     */
    public void setRegulatoryInformation(String regulatoryInformation) {
        this.regulatoryInformation = regulatoryInformation == null ? null : regulatoryInformation.trim();
    }
    /**
     * @return sd_documents_msds_data.liability : 返回 liability
     */
    public String getLiability() {
        return liability;
    }
    /**
     * @param liability of sd_documents_msds_data : 设置 liability
     */
    public void setLiability(String liability) {
        this.liability = liability == null ? null : liability.trim();
    }
    /**
     * @return sd_documents_msds_data.preparation_date : 返回 preparationDate
     */
    public String getPreparationDate() {
        return preparationDate;
    }
    /**
     * @param preparationDate of sd_documents_msds_data : 设置 preparationDate
     */
    public void setPreparationDate(String preparationDate) {
        this.preparationDate = preparationDate == null ? null : preparationDate.trim();
    }
    /**
     * @return sd_documents_msds_data.revision_ate : 返回 revisionDate
     */
    public String getRevisionDate() {
        return revisionDate;
    }
    /**
     * @param revisionAte of sd_documents_msds_data : 设置 revisionDate
     */
    public void setRevisionDate(String revisionAte) {
        this.revisionDate = revisionAte == null ? null : revisionAte.trim();
    }
	@Override
	public String findPrimaryKey() {
		// TODO Auto-generated method stub
		return null;
	}
	public String[] getChemicalFamilys() {
		return chemicalFamilys;
	}
	public void setChemicalFamilys(String[] chemicalFamilys) {
		this.chemicalFamilys = chemicalFamilys;
	}
	public String getSdCode() {
		return sdCode;
	}
	public void setSdCode(String sdCode) {
		this.sdCode = sdCode;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
}