package com.caltrans.rusle.models;

public class P {
	private final String supportpracticesName;
	private final String reference;
	private final float pValue;

	public P(String supportpracticesName, String reference, float pValue) {
		this.supportpracticesName = supportpracticesName;
		this.reference = reference;
		this.pValue = pValue;
	}

	public String getSupportPracticesName() {
		return supportpracticesName;
	}

	public String getReference() {
		return reference;
	}

	public float getPValue() {
		return pValue;
	}
	
	@Override
	public String toString() {
		return String.format("SupportPractices Name: %s, Reference: %s, P value: %f", supportpracticesName, reference, pValue);
	}
}
